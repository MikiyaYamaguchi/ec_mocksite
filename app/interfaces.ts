export interface AdminUser {
	id: string,
	name: string;
	email: string;
}

export interface Item {
	name: string,
	price: number,
	context: string,
	img1: string,
	imt2: string,
	img3: string,
	stock: number,
	category: string,
	tag: string[],
	variations: [{key: string, values: string[]}],
	variations_prices: [{value: string, price: number}]
}