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
	

	if( inputType == "password" ){
		
	} else if( inputType == "mobileNumber" ){
		
	}
	
	
}

/**
 * 필수값 체크 
 */
function checkRequiredField(){
	console.log( $("#signupForm input"));
	
	for(var i=0; i< $("#signupForm input").length; i++ ){
		var obj = $("#signupForm input")[i];
		if( Common.isEmpty( $(obj).val() ) ){
			alert( $(obj).attr("placeholder") + " is required.");
			$(obj).focus();
			return false;
		};
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
