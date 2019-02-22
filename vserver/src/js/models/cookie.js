/**
 * 쿠키 설정
 */

"use strict"

function Cookie(value){}


//Constant
Cookie.CAR_ID = "CAR_ID"; 
Cookie.EXPIRE_MAXIMUM = 100;
Cookie.EXPIRE_MINIMUM = 1;

/**
 * 쿠키값 설정
 * @param name(String), value(String), exp(Number)
 */
Cookie.setCookie = function(name, value, exp){
	
	// Expire 값이 1~100일 범위를 벗어나거나 잘못된 값일경우 MINIMUM SIZE로셋팅
	if( typeof exp == "number" ){
		if( exp < Cookie.EXPIRE_MINIMUM && exp > Cookie.EXPIRE_MAXIMUM ){
			exp = Cookie.EXPIRE_MINIMUM;
		}
	} else{
		exp = Cookie.EXPIRE_MINIMUM;
	}
	
	var date = new Date();
	date.setTime(date.getTime() + (exp*24*60*60*1000));
	
	document.cookie = name + "=" + encodeURI(value) + ';expires=' + date.toUTCString() + ';path=/';
}

/**
 * 쿠키값 얻기
 * @param name(String)
 */
Cookie.getCookie = function(name){
	var cookieVal = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	
	return cookieVal? cookieVal[2] : null;
}

/**
 * 쿠키값 삭제
 * @Param name(String)
 */
Cookie.deleteCookie = function(name){
	var cookieVal = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

