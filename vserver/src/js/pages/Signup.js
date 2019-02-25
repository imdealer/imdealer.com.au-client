function Signup () {

}

Signup.prototype.render = function () {
  console.log('Signup.prototype.render');
  $(function(){
	  console.log('Execute Signup.js');
	  
	  bindSignUpEventListener(); // 이벤트 바인딩
	  
  });
};

/**
 * 유효성 검사
 */
function checkValidation(obj){
	console.log($(obj).attr("id"));
	
	var inputType = $(obj).attr("id");
	var str       = $(obj).val();
	var strLength = str.length;
	

	if( inputType == "firstName" || inputType == "lastName"){
		// 1) only 영어( 특수문자X, 숫자X)
		if( !/^[A-Za-z+]*$/.test(str) ){
			return false;
		}
		  
		// 2) 길이제한 (min:3, max: 30)
		if( strLength < 3 || strLength > 30 ){
			return false;
		}
		
	} else if( inputType == "password" ){
		min - 6
		max - 60
		// 1) 길이제한 (min:3, max: 30)
		if( strLength < 6 || strLength > 30 ){
			return false;
		}
		
	} else if( inputType == "companyABN" ){
		// 1) only - 숫자
		if( !/^[0-9+]*$/.test(str) ){
			return false;
		}
		
		// 2) 길이제한 (min:11, max: 11)
		if( strLength < 11 || strLength > 11 ){
			return false;
		}
	}
	
	
}

/**
 * 필수값 체크 
 */
function checkRequiredField(){
//	console.log( $("#signupForm input"));
	var inputType = $(obj).attr("id");
	
	for(var i=0; i< $("#signupForm input").length; i++ ){
		var obj = $("#signupForm input")[i];
		if( Common.isEmpty( $(obj).val() ) ){
			alert( $(obj).attr("placeholder") + " is required.");
			$(obj).focus();
			return false;
		} else{
			if( inputType != "password" && inputType != "confirmPassword" ){
				$(obj).val( $(obj).val().trim() ); 
			}
		}
	}
	
	if( $("#confirmPassword").val() != $("#confirmPassword").val()){
		alert("password!!");
		return false;
	}
}

function bindSignUpEventListener(){
	// 유효성 검사
	$("#signupForm input").on("focusout", function(){
		checkValidation( this );
	});
	
	// 필수값 체크
	$("#signup").on("click", function(){
		checkRequiredField();
	});
	
	//Sign in 페이지 이동
	$("#signinLink").on("click", function(){
		location.href = "dealer_signin.html";
	})
}
