import React from 'react'
import category from '../Interface/Category'


const samples: category[] = [
		{
		"id": 1,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 2,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 3,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 3,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 3,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 3,
		"name": "some",
		"category_type": "Expense",
	},
	{
		"id": 3,
		"name": "some",
		"category_type": "Expense",
	}
]

const Category = () => {
	const type = "Expense"

	const filterdCategory = samples.filter(cate => cate.category_type === type)

	return (
		<div className='mb-4'>
			{filterdCategory.map(cate => (
				<button
					key={cate.id}
					type='button'
					className='px-4 text-sm border-2 border-slate-300 m-1 rounded-lg hover:bg-teal-400'
				>
					{cate.name}
				</button>
			))}
		</div>
	)
}

export default Category