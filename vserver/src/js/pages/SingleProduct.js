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
	console.log("car_id==> " + carId);
	
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
	
	// Car Details
	$("#productTitle").text(carDetails.year + " " + carDetails.maker + " " + carDetails.model + " " + carDetails.badge + " " + carDetails.series);
	$("#launch").text("No data");
	$("#odometer").text(Common.addComma(carDetails.kilometers) + " km");
	$("#bodyType").text("No data");
	$("#fuel").text(carDetails.fuel_type);
	$("#transmission").text(carDetails.transmission);
	$("#color").text("No data");
	$("#plateNumber").text(carDetails.registration_plate_number);
	$("#expiryDate").text(carDetails.registration_expiry_month + "/" + carDetails.registration_expiry_year);
	$("#suburbs").text(carDetails.suburb);
	$("#postcode").text(carDetails.post_code);
	$("#sellerComment").text(carDetails.comment);
	$("#imdealerComment").text("No data");	
	
	// Modal
	$("#modalTitle").text(carDetails.year + " " + carDetails.maker + " " + carDetails.model + " " + carDetails.badge + " " + carDetails.series);
}

function bindSingleProductEventListener(){
	// Go to previous page 
	$("#previousBtn").on("click", function(){ window.history.back(); return false; });
}





