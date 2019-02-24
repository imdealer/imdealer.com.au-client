function SingleProduct () {

}

SingleProduct.prototype.render = function () {
	console.log('SingleProduct.prototype.render');
 	
 	 $(function(){
 		  console.log('Execute SingleProduct.js');
 		  
 		  loadCarDetails();
 		  bindSingleProductEventListener();
 	  });
 	 
};

/**
 * Content
 */
function loadCarDetails(){
	var carId = Cookie.getCookie(Cookie.CAR_ID);
	console.log(carId);
	
	$.ajax({
		url: "http://aucomimdealer-env.kqbiy3rzcp.ap-southeast-2.elasticbeanstalk.com/api/dev/user_car/" + carId, // test URL
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
			showCarDetails(result);
		}
	});
}

/**
 * Show Car Details
 */
function showCarDetails(carDetails){
	console.log(carDetails);
	
	// 2018 Mazda CX-5 Maxx Sport KF Series Auto i-ACTIV AWD
	$("#productTitle h1").text(carDetails.year + " " + carDetails.maker + " " + carDetails.model + " " + carDetails.transmission);
	$("#launch").text("No data");
	$("#odometer").text(Common.addComma(carDetails.kilometers) + " km");
	$("#bodyType").text("No data");
	$("#fuel").text(carDetails.fuel_type);
	$("#transmission").text(carDetails.transmission);
	$("#color").text("No data");
	$("#plateNumber").text(carDetails.registration_plat_number);
//	$("#expiryTerm").text();
	$("#expiryDate").text(carDetails.registration_expiry_month + "/" + carDetails.registration_expiry_year);
	$("#suburbs").text(carDetails.suburb);
	$("#postcode").text(carDetails.post_code);
	$("#sellerComment").text(carDetails.comment);
	$("#imdealerComment").text("No data");	
}

function bindSingleProductEventListener(){
	// Go to previous page 
	$("#previousBtn").on("click", function(){ window.history.back(); return false; });
}





