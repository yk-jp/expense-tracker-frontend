/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import AppContext from '../../Context/useContext'

import { createCategory, deleteCategory } from '../../Apis/categoryApi'


import preSetupStyles from '../../Utilities/specialStyledClassName'
import { ActionType } from '../../Redux/ActionTypes'
import { Category } from '../../Interface/Category'

const CategorySetting = () => {

	const { userStatus, dispatchUserState } = useContext(AppContext)
	const cateNameRef = useRef<HTMLInputElement>(null)

	const [transactionType, setTransactionType] = useState("Expense")

	const onClickType = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setTransactionType(value)
	}

	const handleCreateCategory = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const newCategory: Category | undefined = await createCategory(userStatus.tokens!, cateNameRef.current!.value, transactionType)
		if (!newCategory) return 

		if(newCategory.category_type === 'Expense') {
			dispatchUserState({type: ActionType.ADD_EXPENSE_CATEGORY, newCategory: [newCategory]})
		} else {
			dispatchUserState({type: ActionType.ADD_INCOME_CATEGORY, newCategory: [newCategory]})
		}
	}

	const handleDeleteCategory = async (id: number, name: string, type: string) => {
		if(!userStatus.tokens) return
		const res = await deleteCategory(userStatus.tokens, id, name, type)
		if (res) {
			dispatchUserState({type: ActionType.DELETE_CATEGORY, categoryId: id,
				categoryType: type
			})
		}
	}

	return (
		<div className='w-1/3'>
			<h3 className='text-2xl'>Add New Category</h3>
			<form className='py-5' onSubmit={handleCreateCategory}>
				<div className={preSetupStyles.inputRowStyle}>
					<label htmlFor='cateName' className={preSetupStyles.labelBasicStyle}>Name</label>
					<input id='cateName' ref={cateNameRef} type="text" className={preSetupStyles.inputBasicStyle}/>
				</div>
				<div className="flex justify-between mb-4">
					<button 
						type="button"
						value="Income"
						className={transactionType === "Income" ? preSetupStyles.selectedButtonStyle : preSetupStyles.unSelectedButtonStyle}
						onClick={onClickType}
					>
					Income</button>
					<button 
						type="button"
						value="Expense"
						className={transactionType === "Expense" ? preSetupStyles.selectedButtonStyle : preSetupStyles.unSelectedButtonStyle}
						onClick={onClickType}
					>
					Expense</button>
				</div>
				<button 
					type='submit'
					className='block w-36 ml-auto p-2 rounded bg-white border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white duration-200 active:translate-y-1'
				>
					Create
				</button>
			</form>
			<div>
				<h3 className='text-xl py-2 border-b-2 border-gray-500'>Income Category</h3>
				{userStatus.category.income.map(cate => (
					<div className='flex justify-between p-2 border-b-2 border-slate-300'>
						<p key={cate.id}>{cate.name}</p>
						<button 
							type='button'
							className='hover:text-gray-500 duration-200 active:translate-y-1'
							onClick={() => handleDeleteCategory(cate.id, cate.name, 'Income')}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				))}
				<h3 className='text-xl mt-5 py-2 border-b-2 border-gray-500'>Expense Category</h3>
				{userStatus.category.expense.map(cate => (
					<div className='flex justify-between p-2 border-b-2 border-slate-300'>
						<p key={cate.id}>{cate.name}</p>
						<button 
							type='button'
							className='hover:text-gray-500 duration-200 active:translate-y-1'
							onClick={() => handleDeleteCategory(cate.id, cate.name, 'Expense')}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default CategorySetting
