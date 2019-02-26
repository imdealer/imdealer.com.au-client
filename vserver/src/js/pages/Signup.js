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
	var inputType = $(obj).attr("id");
	var str       = $(obj).val();
	var strLength = str.length;
	

	if( inputType == "firstName" || inputType == "lastName"){
		// 1) only 영어( 특수문자X, 숫자X)
		if( !/^[A-Za-z+]*$/.test(str) ){
			alert( $(obj).attr("placeholder") + "는 영어만 허용합니다. ");
			$(obj).focus();
			return false;
		}
		  
		// 2) 길이제한 (min:3, max: 30)
		if( strLength < 3 || strLength > 30 ){
			alert( $(obj).attr("placeholder") + "는 3자 이상 30자 이하 입니다.");
			$(obj).focus();
			return false;
		}
		
	} else if( inputType == "email" ){
		if( !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str) ){
			alert( $(obj).attr("placeholder") + " 형식에 맞지 않습니다.");
			$(obj).focus();
			return false;
		}
		
	}else if( inputType == "password" ){
		// 1) 길이제한 (min:6, max: 30)
		if( strLength < 6 || strLength > 30 ){
			alert( $(obj).attr("placeholder") + "는 6자 이상 30자 입니다.");
			$(obj).focus();
			return false;
		}
		
	} else if( inputType == "companyABN" ){
		// 1) only - 숫자
		if( !/^[0-9+]*$/.test(str) ){
			alert( $(obj).attr("placeholder") + "는 숫자만 허용합니다. ");
			$(obj).focus();
			return false;
		}
		
		// 2) 길이제한 (min:11, max: 11)
		if( strLength < 11 || strLength > 11 ){
			alert( $(obj).attr("placeholder") + "는 11자 입니다.");
			$(obj).focus();
			return false;
		}
	} else if( inputType == "dealerLicenseNo" ){
		// 1) 길이제한 (min:3, max: 30)
		if( strLength < 3 || strLength > 30 ){
			alert( $(obj).attr("placeholder") + "는 3자 이상 30자 입니다.");
			return false;
		}
	} else if( inputType == "companyName" ){
		// 1) 길이제한 (min:3, max: 50)
		if( strLength < 3 || strLength > 50 ){
			alert( $(obj).attr("placeholder") + "는 3자 이상 50자 입니다.");
			$(obj).focus();
			return false;
		}
	} else if( inputType == "street1" ){
		// 1) 길이제한 (min:1, max: 100)
		if( strLength < 1 || strLength > 100 ){
			alert( $(obj).attr("placeholder") + "는 1자 이상 100자 입니다.");
			$(obj).focus();
			return false;
		}
	} else if( inputType == "street2" ){
		// 1) 길이제한 (min:1, max: 100)
		if( strLength < 1 || strLength > 100 ){
			alert( $(obj).attr("placeholder") + "는 1자 이상 100자 입니다.");
			$(obj).focus();
			return false;
		}
	} else if( inputType == "suburbs" ){
		// 1) 길이제한 (min:3, max: 30)
		if( strLength < 3 || strLength > 30 ){
			alert( $(obj).attr("placeholder") + "는 3자 이상 30자 입니다.");
			$(obj).focus();
			return false;
		}
	} else if( inputType == "postcode" ){
		// 1) 길이제한 (min:3, max: 5)
		if( strLength < 3 || strLength > 5 ){
			alert( $(obj).attr("placeholder") + "는 3자 이상 5자 입니다.");
			$(obj).focus();
			return false;
		}
	}
}

/**
 * 필수값 체크 
 */
function checkRequiredField(){
	var inputType = $(obj).attr("id");
	
	for(var i=0; i< $("#signupForm input").length; i++ ){
		var obj = $("#signupForm input")[i];
		if( Common.isEmpty( $(obj).val() ) ){
			alert( $(obj).attr("placeholder") + " is required.");
			$(obj).focus();
			return false;
		}
		
		if( inputType != "password" && inputType != "confirmPassword" ){
				$(obj).val( $(obj).val().trim() ); 
		}
	}
	
	if( $("#confirmPassword").val() != $("#confirmPassword").val()){
		alert("password!!");
		return false;
	}
	
	return true;
}

/**
 * Sign up
 */
function doSignup(){
	console.log("doSignup()");
	
	console.log( $("input[name='uploading_file']").val() );

//	console.log(JSON.stringify({
//		client_application_id: 1,
//		first_name           : $("input[name='first_name']").val(),
//		last_name            : $("input[name='last_name']").val(),
//		email                : $("input[name='email']").val(),
//		password             : $("input[name='password']").val(),
//		mobile_number        : $("input[name='mobile_number']").val(),
//		comment              : $("input[name='comment']").val(),
//		company_name         : $("input[name='company_name']").val(),
//		abn                  : $("input[name='abn']").val(),
//		dealer_license_number: $("input[name='dealer_license_number']").val(),
//		street1              : $("input[name='street1']").val(),
//		street2              : $("input[name='street2']").val(),
//		suburb               : $("input[name='suburb']").val(),
//		state                : $("input[name='state']").val(),
//		postcode             : $("input[name='postcode']").val(),
//		uploading_file       : $("input[name='uploading_file']").val()
//	}));
	
//	const formData = new FormData();
//    formData.append('uploading_file', this.uploadingFile.current.files[0]);
//    formData.append('email', document.querySelector('input[name="email"]').value);
//	  
//	$.ajax({
//		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/dealer_signup",
//		data: JSON.stringify({
//			client_application_id: 1,
//			first_name           : $("input[name='first_name']").val(),
//			last_name            : $("input[name='last_name']").val(),
//			email                : $("input[name='email']").val(),
//			password             : $("input[name='password']").val(),
//			mobile_number        : $("input[name='mobile_number']").val(),
//			comment              : $("input[name='comment']").val(),
//			company_name         : $("input[name='company_name']").val(),
//			abn                  : $("input[name='abn']").val(),
//			dealer_license_number: $("input[name='dealer_license_number']").val(),
//			street1              : $("input[name='street1']").val(),
//			street2              : $("input[name='street2']").val(),
//			suburb               : $("input[name='suburb']").val(),
//			state                : $("input[name='state']").val(),
//			postcode             : $("input[name='postcode']").val(),
//			uploading_file       : $("input[name='uploading_file']").val()
//		}),
//		headers: {
//			"Content-Type": "application/json",
//			"Accept": "application/json, text/plain, */*",
//			"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
//		},
//		method: "POST",
//		success: function(result){
//			console.log(result);
//		}
//	});
}

function bindSignUpEventListener(){
	// 유효성 검사
	$("#signupForm input").on("change", function(){
		checkValidation( this );
	});
	
	// Sign up
	$("#signupForm").submit(function( event ) {
		event.preventDefault();
		  
		var isvalid = checkRequiredField(); // 필수값 체크
//		if( isvalid ){ doSignup() };
		 doSignup();
	});
	
	//Sign in 페이지 이동
	$("#signinLink").on("click", function(){
		location.href = "dealer_signin.html";
	})
}
