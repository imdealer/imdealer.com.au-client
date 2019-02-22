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
	loadFilter();    // 필터값 불러오기
	eventListener(); // 이벤트 바인딩
});


/**
 * 페이지 상단 필터 불러오기
 */
function loadFilter(){
	loadMaker();
	
}

/**
 * Car maker 불러오기
 */
function loadMaker(){
	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/makers",
		data: JSON.stringify({
			client_application_id: 1
		}),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json, text/plain, */*",
			"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
		},
		method: "POST",
		success: function(result){
			addOptions(result, "maker");
		}
	});
}

/**
 * 자동차 model 불러오기
 */
function loadModel(){
	var maker = $("#maker").val();

	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/models/" + maker,
		data: JSON.stringify({
			client_application_id: 1
		}),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json, text/plain, */*",
			"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
		},
		method: "POST",
		success: function(result){
			addOptions(result, "model");
		}
	});
}

/**
 * 자동차 year 불러오기
 */
function loadYear(){
	var maker = $("#maker").val();
	var model = $("#model").val();

	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/years/" + maker + "/" + model,
		data: JSON.stringify({
			client_application_id: 1
		}),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json, text/plain, */*",
			"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
		},
		method: "POST",
		success: function(result){
			addOptions(result, "year");
		}
	});
}

/**
 * option 동적으로 생성하는 함수
 */
function addOptions(resultList, key){
	clearOption(key, key);
	
	for(var i=0; resultList != null && i<resultList.length; i++){
		var value = resultList[i][key];
		$("#"+key).append("<option value='" + value + "'>" + value + "</option>");
	}
}

/**
 * option 리스트 삭제
 */
function clearOption(selectId){
	$("#" + selectId + " option").remove();
	$("#" + selectId).append("<option value=''>" + selectId + "</option>");
}


function eventListener(){
	// maker
	$("#maker").on("change", function(){
		loadModel();
		
		$("#model").attr("disabled", false);
		$("#year").attr("disabled", true);
		
		clearOption("year");
	});
	
	// model
	$("#model").on("change", function(){
		loadYear();
		
		$("#year").attr("disabled", false);
	});
	
	
	// 자동차 리스트 아이템 클릭했을때 페이지 이동
	$(".showroom-items-col").click(function(){
		var carId = $(this).attr("id");
		Cookie.deleteCookie(Cookie.CAR_ID);
		Cookie.setCookie(Cookie.CAR_ID, carId, Cookie.EXPIRE_MAXIMUM);
		
		location.href = "dealer_product.html";
	});	
}