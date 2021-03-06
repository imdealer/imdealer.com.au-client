/**
 * Create Date: 24 Feb 2019
 */
"use strict"

function Page(value){
	
}

var currPage   = 1; // 현재의 페이지
var lastPageNo = 1; // 마지막 페이지
var maxPage    = 5; // 네비게이션바에 보이는 페이지 개수

var pageObj    = null; // Pagination Object

/**
 * 현재 페이지 리턴
 */
Page.getCurrPage = function(){
	return currPage;
}

/**
 * 페이지 네비게이션바 생성
 * @Param totalItmes: 총 아이템 개수 
 *         maxDisplay: 한 페이지에 보여질 아이템 개수(Default : 12)
 *         maxPage   : 네비게이션바에 보이는 페이지 개수 (Default : 5)
 *
 * @함수사용법 html: <div id="pagination"></div>
 * 				js  : 1) 페이지네이션 생성 $("#pagination").makePagination(totalItmes, maxDisplay, maxPage);
 *                    2) 필수 함수: goPage() 페이지 이동 후 데이터 로드되는 부분 
 */
$.prototype.makePagination = function(totalItems, maxDisplay, pMaxPage, currPage){
	// 1. default 값 생성
	if(typeof totalItems != "number" || totalItems < 0){ 
		totalItems = 0; 
	}
	
	if(typeof maxDisplay != "number" || maxDisplay < 0){ 
		maxDisplay = 12; 
	}

	if(typeof pMaxPage != "number" || pMaxPage < 0){
		maxPage = 5; 
	} else{
		maxPage = pMaxPage; 
	}
	
	if(typeof currPage == "undefined"){
		currPage = 1;
	}
	
	// 2. totalItems 개수에 따라 lastPageNo 계산
	lastPageNo = parseInt((totalItems-1) / maxDisplay) + 1;
	if( lastPageNo < maxPage ){ maxPage = lastPageNo; }
	
	// 3. 페이지 네비게이션 바 생성
	pageObj = this;
	renderPageNav( parseInt((currPage-1)/maxPage)*maxPage+1, currPage);
	
}

/**
 * 페이지 그리기
 * @param startNo, currNo
 */
function renderPageNav(startNo, currNo){
	// 1. << , < 생성
	var pageNav = $("<ul>").addClass("imdealer-pagination-style")
					.append($("<li>").addClass("imdealer-page-link")
							.append($("<span>").attr({"onclick": "changeCurrPage('arrow', " + -maxPage +")"}).addClass("imdealer-page-text").text("<<")))
					.append($("<li>").addClass("imdealer-page-link")
							.append($("<span>").attr({"onclick": "changeCurrPage('arrow', -1)"}).addClass("imdealer-page-text").text("<")));
	
	// 2. 숫자부분 생성
	var endNo = ( startNo+maxPage > lastPageNo )? lastPageNo+1:startNo+maxPage;
	for(var i= startNo; i<endNo; i++){
		var currentPageClass = (i==currNo)? "imdealer-page-text-current" : "imdealer-page-text";
		$(pageNav).append($("<li>").addClass("imdealer-page-link")
					.append($("<span>").attr({"onclick": "changeCurrPage('page', " + i + ")"}).addClass(currentPageClass).text(i)));
	}
	
	// 3. >, >> 생성
	$(pageNav).append($("<li>").addClass("imdealer-page-link")
					.append($("<span>").attr({"onclick": "changeCurrPage('arrow', 1)"}).addClass("imdealer-page-text").text(">")))
			  .append($("<li>").addClass("imdealer-page-link")
					.append($("<span>").attr({"onclick": "changeCurrPage('arrow', " + maxPage +")"}).addClass("imdealer-page-text").text(">>")));

	
	$(pageObj).text("");
	$(pageObj).addClass("d-flex justify-content-center py-4").append(pageNav);
}

/**
 * 현재페이지 계산하여 스타일 변경 및 currPage 변수에 저장
 * 
 * @Param  type : page, arrow
 * 			goCnt: 얼마만큼 이동을 원하는지
 */
function changeCurrPage(type, goCnt){
	var currPageGroup   = parseInt((currPage-1)/maxPage);
	var changePageGroup = 1;
	
	// 1. <<, <, >, >> 로 이동하는 경우 계산
	if( type == "page" ){
		currPage = goCnt;
	} else {
		currPage = parseInt(currPage) + goCnt;
		
		if( currPage < 1 ){
			currPage = 1;
		}else if( currPage > lastPageNo ){
			currPage = lastPageNo;
		}
	}
	
	// 2. 호출한 페이지의 함수 호출
	goPage();
}

