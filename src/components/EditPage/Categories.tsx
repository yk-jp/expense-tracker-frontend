/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'

import AppContext from '../../Context/useContext'
import { Category } from '../../Interface/Category'


type Props = {
	transType: string,
	setCategory: React.Dispatch<React.SetStateAction<Category | null>>,
	setCatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const CategoryButtons = ({setCategory, setCatePickerOpened, transType}: Props) => {

	const {userStatus} = useContext(AppContext)
	const [targetCate, setTargetCate] = useState<Category[]>([])

	const onClickCatePicked = (category: Category) => {
		setCategory(category)
		setCatePickerOpened(false)
	}
	

	useEffect(()=>{
		if (transType === "Expense"){
			setTargetCate(userStatus.category.expense)
		} else {
			setTargetCate(userStatus.category.income)
		}
	}, [transType])


	return (
		<div className='mb-4'>
			{targetCate.map(cate => (
				<button
					key={cate.id}
					value={cate.name}
					type='button'
					onClick={() => onClickCatePicked(cate)}
					className='px-4 py-1 border-2 border-slate-300 m-1 rounded-lg hover:bg-teal-400'
				>
					{cate.name}
				</button>
			))}
		</div>
	)
}

export default CategoryButtons