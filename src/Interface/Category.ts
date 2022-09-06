export default interface category {
	id: number,
	name: string,
	category_type: string,
}

export interface categoryAll {
	income: category[],
	expense: category[]
}