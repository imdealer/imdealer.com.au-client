"use strict"

function Common(value){}

/**
 * 숫자 3자리마다 ',' 찍음
 */
Common.addComma = function(num){
	if(typeof num == "undefined") { num =0; } 
	 var regexp = /\B(?=(\d{3})+(?!\d))/g;
	 return num.toString().replace(regexp, ',');
}

/**
 * 값이 null, 빈공간 체크
 * null, 빈공간: return true  
 */
Common.isEmpty = function(param){
	if( param == null || param == ""){
		return true;
	} else{
		return false;
	}
}

/**
 * String을 Boolean(true, false)으로 변경 
 */
Common.parseBoolean = function(param){
	if( !Common.isEmpty(param) && param.toUpperCase() == "TRUE" ){
		return true;
	} else{
		return false;
	}
}