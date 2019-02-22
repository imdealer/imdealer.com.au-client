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
 */
Cookie.getCookie = function(name){
	console.log(document.cookie);
	var cookieVal = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	
	return cookieVal? cookieVal[2] : null;
}

/**
 * 쿠키값 삭제
 */
Cookie.deleteCookie = function(name){
	var cookieVal = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
































// $(function(){
	// console.log("테스트");
	
	// $.ajax({
	// 	url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/models/Alfa Romeo",
	// 	data: JSON.stringify({
	// 		client_application_id: 1
	// 	}),
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		"Accept": "application/json, text/plain, */*",
	// 		"x-api-key": "5N64T45-4PD48XB-PDTQX5W-Z5K1AT0"
	// 	},
	// 	method: "POST",
	// 	success: function(result){
	// 		console.log("---------------");
	// 		callbackFunTest(result);
	// 	}
	// });
	
	
	
	// 1. 권한체크
	// 1) 권한에 따라 조회 조건 달라짐?
	// 2) 권한체크가 필요한가?
	
	// 2. 페이지 로딩
	// 1) 처음 페이지 로딩 될때 빈화면이 출력될지 모든 car 다 보일지(1페이지 12개 출력) => all user cars and photos of them
	
	
	// 3. 필터 불러오기
	// 1) 필터를 불러올때 일부항목 종속적임
	//    => maker 따라 model 달라지고, maker&model 따라 year달라짐
	//    => maker -> model -> year은 순차적으로 선택되어야 함?
	//    => 만약 3개 조건 순차적 선택이라면, disabled 처리하는게 좋음
	// 2) transmission, states, fuel은 master로 관리하는게 아니라 하드코딩?(옵션 값 없음)
	// 3) 처음 필터 조건이 maker가 아니라 make가 맞음?
	// 4) 필수값 없음?
	
	// 4. 이벤트 바인딩
	// 1) search 버튼 클릭: 'Showroom - user cars - filltered' 호출해서 결과값 받아옴 
	//     => request 값에 대한 정보는 따로 없음?
	//     => 사진 상단의 박스 빨강, 파랑은 뭐에 따라 달라짐?
	//     => '2018 MAZDA CX-5' 이 타이틀은 바로 받아오는 값인지 몇개의 값을 조합해서 출력하는건지. 어떤 Key엥 매칭되는 Value인지
	// 2) car photo 버튼 클릭: car id 따라서 상세페이지(dealer_product)로 이동 
	// 3) 하단 페이지 네비게이션 클릭: 해당 페이지로 이동(Showroom - user cars - by page)

	// 5. 기타
	// endpoint 호출해서 데이터 갖고 오는거 확인
	// 'user car - by id' 랑 'user cars - by user id' 차이 뭐지? userId 따라서도 보이는게 있음?
	// no results 에 대한 페이지 디자인 되어 있음?
	// navigation, footer는 공통이므로 뺄 수 있으면 빼면 좋음
	// 개발하면서 html 페이지 약간은 바꿔도 됨? 예를들어, '2018 MAZDA CX-5'부분은 클래스가 아니라 띄어쓰기만 하면 될듯(만약 글자를 통으로 가져온다면), 상세페이지에서 글자수 넘어갈때 처리 안되어 있음.
	// jquery가 파일을 다운로드 해서 넣은게 아니라 인터넷에서 바로 불러오게 되있음. 확인필요
	
	
	
	
	
//text-overflow: ellipsis;
//display: inline-block;
//width: 100px;
//white-space: nowrap;
//overflow: hidden;

// });

/* function callbackFunTest(result){
	console.log(result);
} */