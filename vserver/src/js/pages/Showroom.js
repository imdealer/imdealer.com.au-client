function Showroom () {

}

Showroom.prototype.render = function () {
  console.log('Showroom.prototype.render');
  $(function(){
	  console.log('Execute Showroom.js');
	  
	  loadFilter();    // 필터 불러오기
	  loadContent(1);   // content 불러오기
	  bindShowroomEventListener(); // 이벤트 바인딩
	  
	  renderPagination();
  });
};

var maxDisplay = 12; // 한 페이지에 보여질 아이템 개수
var maxPage    = 5 ; // 네비게이션바에 보이는 페이지 개수

/**
 * 페이지 상단 필터 불러오기
 */
function loadFilter(){
	loadMaker();
	loadModel();
	loadYear();
	loadTransmission();
	loadStates();
	loadFuel()
}

/**
 * Maker filter
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
 * Model filter
 */
function loadModel(){
	var maker = $("#maker").val();
	
	if(maker != null && maker != ""){
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
	} else{
		addOptions([], "model");
	}

}

/**
 * Year filter
 */
function loadYear(){
	var maker = $("#maker").val();
	var model = $("#model").val();
	
	if( (maker != null && maker != "") && (model != null && model != "")){
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
	} else{
		addOptions([], "year");
	}
}

/**
 * Transmission filter
 */
function loadTransmission(){
	var tranList = ['AUTO', 'MANUAL'];
	addOptions(tranList, "transmission");
}

/**
 * States filter 
 */
function loadStates(){
	var statesList = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
	addOptions(statesList, "states");
}

/**
 * Fuel filter 
 */
function loadFuel(){
	var fuelList = ['PETROL', 'DIESEL'];
	addOptions(fuelList, "fuel");
}

/**
 * Content
 */
function loadContent(page){
	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/" + maxDisplay + "/" + page,
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
			console.log("loadContent()");
			console.log(result);
			lenderItem(result);
		}
	});
}

/**
 * 페이지 Content 부분에 items 불러옴
 */
function lenderItem(itemList){
	$("#contentRow").text("");
	
	for(var i = 0; itemList != null && i < itemList.length; i++){
		var item = itemList[i];
		
		var contentHeader = $("<div>").addClass("showroom-items-bid-endingsoon d-flex justify-content-center font-weight-bold py-2 mb-2")
								.append($("<div>").addClass("mr-3")
										.append($("<span>").addClass("text-uppercase mr-1").text("brds:"))
										.append($("<span>").text("14")))
								.append($("<div>")
										.append($("<span>").addClass("text-uppercase mr-1").text("left:"))
										.append($("<span>").addClass("mr-1").text("40m")));

		var contentImage  = $("<div>").addClass("image-wrapper")
								.append($("<div>").addClass("image showroom-sample-image")
										.append($("<div>").addClass("button-overlay")
												.append("<div>").addClass("button")
													.append("<span>").text("VIEW")
													.append("<i>").addClass("fa fa-external-link")));
		
		var contentTitle  = $("<div>").addClass("showroom-items-title")
								.append($("<h5>").addClass("mr-1").text("2018"))
								.append($("<h5>").addClass("mr-1").text(item.maker))
								.append($("<h5>").text(item.model));
		
		var contentDetail = $("<div>").addClass("showroom-items-details")
								.append($("<div>").addClass("showroom-items-info")
										.append($("<div>").addClass("row")
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("Odometer")))
												.append($("<div>").addClass("col-6 d-flex justify-content-end showroom-items-details-text")
														.append($("<span>").text(Common.addComma(item.kilometers) + " km")))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("body type")))
												.append($("<div>").addClass("col-6 text-uppercase d-flex justify-content-end showroom-items-details-text")
														.append($("<span>").text(item.body_type)))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("fuel type")))
												.append($("<div>").addClass("col-6 text-uppercase d-flex justify-content-end showroom-items-details-text")
														.append($("<span>").text(item.fuel_type)))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("transmission")))
												.append($("<div>").addClass("col-6 d-flex justify-content-end showroom-items-details-text")
														.append($("<span>").text(item.transmission)))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("rego expiry")))
												.append($("<div>").addClass("col-6 d-flex justify-content-end showroom-items-details-text")
															.append($("<span>").text(item.registration_expiry_month + "/" + item.registration_expiry_year)))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
														.append($("<span>").text("Location")))
												.append($("<div>").addClass("col-6 d-flex justify-content-end showroom-items-details-text")
															.append($("<span>").text(item.suburb)))
												.append($("<div>").addClass("clearfix"))
												.append($("<div>").addClass("col-6 showroom-items-details-title")
															.append($("<span>").text("POSTCODE")))
												.append($("<div>").addClass("col-6 d-flex justify-content-end showroom-items-details-text")
															.append($("<span>").text(item.post_code)))
												.append($("<div>").addClass("clearfix"))
										));
		
		var content       = $("<div>").addClass("col-md-4 col-lg-3 col-sm-6 p-3")
								.append($("<div>").addClass("showroom-items-col").attr("id", item.id)
										.append(contentHeader)
										.append(contentImage)
										.append(contentTitle)
										.append(contentDetail))
										.appendTo("#contentRow");
		
	}
}

/**
 * Search cars
 */
function searchCars(page){
	var maker        = $("#maker").val();
	var model        = $("#model").val();
	var year         = $("#year").val();
	var transmission = $("#transmission").val();
	var states       = $("#states").val();
	var fuel         = $("#fuel").val();
	
	// 1. Validation
	if( Common.isEmpty($("#maker").val()) )       { alert("Maker is required."); return false;}
	if( Common.isEmpty($("#model").val()) )       { alert("Model is required."); return false;}
	if( Common.isEmpty($("#year").val()) )        { alert("Year is required."); return false;}
	if( Common.isEmpty($("#transmission").val()) ){ alert("Transmission is required."); return false;}
	if( Common.isEmpty($("#states").val()) )      { alert("States is required."); return false;}
	if( Common.isEmpty($("#fuel").val()) )        { alert("Fuel is required."); return false;}
	
	// 2. Search
	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_cars/" + maker + "/" +model + "/" + year + "/" + transmission + "/" + fuel + "/" + states + "/" + maxDisplay + "/" + page,
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
			console.log("searchCars()");
			console.log(result);
			lenderItem(result);
			renderPagination();
		}
	});
	
}

/**
 * Pagination 
 */
function renderPagination(){
	// 1. 검색조건이 있는지 없는지 확인
	var maker        = $("#maker").val();
	var model        = $("#model").val();
	var year         = $("#year").val();
	var transmission = $("#transmission").val();
	var states       = $("#states").val();
	var fuel         = $("#fuel").val();
	
	
	// 2. 검색조건에 있는경우와 업는 경우에 따라 분기
	var ajaxURL = "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/count/user_cars";
	if( isFiltered() ){
		ajaxURL = "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/count/user_cars_filtered/" + maker + "/" +model + "/" + year + "/" + transmission + "/" + fuel + "/" + states;
	}
	
	$.ajax({
		url: ajaxURL,
		data: JSON.stringify({
			client_application_id: 1
		}),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json, text/plain, */*",
			"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
		},
		method: "POST",
		success: function(totalItems){
			console.log( "totalItems==> " + totalItems );
			$("#pagination").makePagination(totalItems, maxDisplay, maxPage);
		}
	});
	
}

/**
 * 로드될 데이터가 검색조건이 있는지 아닌지 확인
 */
function isFiltered(){
	var isSearchBtnClicekd = Common.parseBoolean($("#searchBtn").attr("attr-searched"));
	var isFiltered = false; // url 분기
	
	if( isSearchBtnClicekd && !Common.isEmpty($("#maker").val()) && !Common.isEmpty($("#model").val()) && !Common.isEmpty($("#year").val()) && !Common.isEmpty($("#transmission").val()) && !Common.isEmpty($("#states").val()) && !Common.isEmpty($("#fuel").val()) ){
		isFiltered = true;
	}
	
	return isFiltered;
}

/**
 * 페이지 이동
 * page.js에서 페이지 생성할 경우 필수 함수
 * page.js에서 페이지 이동 후 goPage() 호출하는 구조로 되어있음
 */
function goPage(){
	var currPage = Page.getCurrPage();
	if( isFiltered() ){
		searchCars( currPage );
	}else{
		loadContent( currPage );
	}
	
};

/**
 * option 동적으로 생성하는 함수
 */
function addOptions(resultList, key){
	clearOption(key);
	
	var optData = new Array();
	for(var i=0; resultList != null && i<resultList.length; i++){
		var value = resultList[i][key];
		if(typeof value == "undefined") {
			value = resultList[i]; }
		
		var opt = {id: value, text: value};
		optData.push(opt);
	}
	
	$("#" + key).select2({
		data: optData,
		placeholder: key
	});
}

/**
 * option 리스트 삭제
 */
function clearOption(selectId){
	$("#" + selectId + " option").remove();
	$("#" + selectId).append("<option></option>");
}


function bindShowroomEventListener(){
	// maker
	$("#maker").on("change", function(){
		loadModel();
		
		$("#model").prop("disabled", false);
		$("#year").prop("disabled", true);
		
		clearOption("year");
	});
	
	// model
	$("#model").on("change", function(){
		loadYear();
		
		$("#year").attr("disabled", false);
	});
	
	// 자동차 리스트 아이템 클릭했을때 페이지 이동
	$("#contentRow").on("click", ".showroom-items-col",  function(){
		var carId = $(this).attr("id");
		Cookie.deleteCookie(Cookie.CAR_ID);
		Cookie.setCookie(Cookie.CAR_ID, carId, Cookie.EXPIRE_MAXIMUM);
		
		location.href = "dealer_product.html";
	});	
	
	// 검색
	$("#searchBtn").on("click", function(){
		$(this).attr("attr-searched", true);
		searchCars(1);
	})
}