"use strict"

function Common(value){}

/**
 * 숫자 3자리마다 ',' 찍음
 */
Common.addComma = function(num){
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