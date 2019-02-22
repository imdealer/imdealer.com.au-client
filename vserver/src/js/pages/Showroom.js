function Showroom () {

}

Showroom.prototype.render = function () {
  console.log('Showroom.prototype.render');

  //쿠키 생성 테스트
  Cookie.setCookie(Cookie.CAR_ID, "carIdTest", Cookie.EXPIRE_MAXIMUM);
  console.log(Cookie.getCookie(Cookie.CAR_ID));
  
  //쿠키 삭제 테스트
  Cookie.deleteCookie(Cookie.CAR_ID);
  console.log(Cookie.getCookie(Cookie.CAR_ID));
};


$(function(){
	eventListener();
});



function eventListener(){
	$(".showroom-items-col").click(function(){
		var carId = $(this).attr("id");
		Cookie.deleteCookie(Cookie.CAR_ID);
		Cookie.setCookie(Cookie.CAR_ID, carId, Cookie.EXPIRE_MAXIMUM);
		
		location.href = "dealer_product.html";
	});	
}