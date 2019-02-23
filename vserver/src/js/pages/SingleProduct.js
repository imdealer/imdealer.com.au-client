function SingleProduct () {

}

SingleProduct.prototype.render = function () {
	console.log('SingleProduct.prototype.render');
 	console.log(Cookie.getCookie(Cookie.CAR_ID));
 	
 	 $(function(){
 		  console.log('Execute SingleProduct.js');
 		  loadContent();
 	  });
 	 
};

/**
 * Content
 */
function loadContet(){
	
}