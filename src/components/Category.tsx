/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../Context/useContext'
import category from '../Interface/Category'


type Props = {
	transType: string,
	setCategory: React.Dispatch<React.SetStateAction<string>>,
	setCatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const Category = ({setCategory, setCatePickerOpened, transType}: Props) => {

	const {dispatchUserState, userStatus} = useContext(AppContext)
	const [targetCate, setTargetCate] = useState<category[]>([])

	const onClickCatePicked = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setCategory(value)
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