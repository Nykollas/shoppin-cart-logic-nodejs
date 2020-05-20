const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];



function getShoppingCart(ids, productsData) {

	const productsByIds = ids.map(productId => {
		return productsData.find(val => {
			return val.id == productId;
		})
	});

	const promotionsIndex  = productsByIds.map(val => {
		return val.category
	}).filter((val, index, arr) => {
		return arr.indexOf(val) == index;
	}).length -1;

	const products = productsByIds.map(val => {
		return {
			name:val.name,
			category:val.category
		}
	});
	
	let discountValue = productsByIds.map(val => {
		const promotion = val.promotions.find(val => {
			if(val.looks.includes(promotions[promotionsIndex])){
				return	val.price;
			}
		});
		const promotionValue  = promotion && promotion.price;
		if(promotionValue){
			
			return val.regularPrice - promotionValue;
		}
	}).reduce((acc, curr) => {
		if(curr){
			return acc + curr;
		}else{
			return acc;
		}
	})
	
	let totalPrice = productsByIds.map(val => {
		
		return val.regularPrice;
	}).reduce((acc, curr) => {
		console.log(curr);
		if(curr){
			return acc + curr;
		}else{
			return acc;
		}
	});

	let promotion = promotions[promotionsIndex];
	let discount  = ( discountValue / totalPrice ) * 100;

	totalPrice -= discountValue;
	totalPrice = totalPrice.toFixed(2).toString();
	discountValue = discountValue.toFixed(2).toString();
	discount = discount.toFixed(2).toString().concat('%');

	console.log({
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	
	});

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	
	};
}



module.exports = { getShoppingCart };
