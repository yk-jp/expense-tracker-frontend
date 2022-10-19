export interface Category {
	id: number,
	name: string,
	category_type: string,
}

export interface CategoryAll {
	income: Category[],
	expense: Category[]
}
