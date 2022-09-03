import React from 'react'
import PropTypes from 'prop-types'

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

type Props = {
	transType: string,
	setCategory: React.Dispatch<React.SetStateAction<string>>,
	setCatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const Category = ({setCategory, setCatePickerOpened, transType}: Props) => {

	const filteredCategory = samples.filter(cate => cate.category_type === transType)

	const onClickCatePicked = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setCategory(value)
		setCatePickerOpened(false)
	}
	return (
		<div className='mb-4'>
			{filteredCategory.map(cate => (
				<button
					key={cate.id}
					value={cate.name}
					type='button'
					onClick={onClickCatePicked}
					className='px-4 text-sm border-2 border-slate-300 m-1 rounded-lg hover:bg-teal-400'
				>
					{cate.name}
				</button>
			))}
		</div>
	)
}

Category.propTypes = {
	transType: PropTypes.string.isRequired,
	setCategory: PropTypes.func.isRequired,
	setCatePickerOpened: PropTypes.func.isRequired
}

export default Category