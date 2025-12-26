export interface AdminUser {
	id: string,
	name: string;
	email: string;
}

export interface Item {
	_id: string,
	name: string,
	price: number,
	context?: string,
	img1: string,
	img2?: string,
	img3?: string,
	stock: number,
	category?: string,
	tag?: string[],
	variations?: [{key: string, values: string[]}],
	variations_prices?: {value: string, price: number}[]
}