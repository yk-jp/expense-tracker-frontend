/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, {useState, useContext, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import MiniCalendar from "./MiniCalendar";
import Category from "./Category";
import AppContext from "../Context/useContext";
import category from "../Interface/Category";
import { ActionType } from "../Redux/ActionTypes";
import postTransaction from "../Apis/transactionApi";
import { convertDayToString } from "../Utilities/date";
import { createCategory } from "../Apis/categoryApi";
import { generateNewToken } from "../Apis/accountApi";
import tokens from "../Interface/Token";

const inputRowStyle = "flex mb-4"
const labelBasicStyle = " w-1/3 block "
const inputBasicStyle = "grow block text-right bg-white border-b-2 border-b-gray-300 hover:border-b-gray-500 focus:border-b-gray-500"
const selectedButtonStyle = "w-2/5 text-center py-1 border-2 border-orange-500 text-orange-500 rounded-md"
const unSelectedButtonStyle = "w-2/5 text-center py-1 border-2 border-gray-300 text-gray-400 rounded-md hover:text-gray-600 hover:border-gray-500"

const Resister = () => {
	const amountInputRef = useRef<HTMLInputElement>(null)
	const memoTextAreaRef = useRef<HTMLTextAreaElement>(null)
	const { dispatchDisplayStatus, userStatus, dispatchUserState } = useContext(AppContext)
	const [transactionType, setTransactionType] = useState("Expense")
	const [transDay, setTransDay] = useState(new Date())
	const [datePickerOpened, setDatePickerOpened] = useState(false)
	const [transCate, setTransCate] = useState('')
	const [catePickerOpened, setCatePickerOpened] = useState(false)

	const onClickType = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setTransactionType(value)
	}

	const onChangeCategoryInput = (e: React.FormEvent<HTMLInputElement>) => {
		setTransCate(e.currentTarget.value)
	}

	const isCategoryExist = async (): Promise<category| null> =>{
		let cateForResister: category | undefined
		if (transactionType === "Expense") {
			cateForResister = userStatus.category.expense.find(obj => obj.name === transCate)
		} else {
			cateForResister = userStatus.category.income.find(obj => obj.name === transCate)
		}
		if (cateForResister !== undefined ) {return cateForResister}

		// create new category
		cateForResister = await createCategory(userStatus.tokens!, transCate, transactionType)
		if (cateForResister === undefined ){
			const res = await generateNewToken(userStatus.tokens!.refresh!)
			if (Object.prototype.hasOwnProperty.call(res, 'refresh')){
				const newToken = res as tokens
				cateForResister = await createCategory(newToken, transCate, transactionType)
				dispatchUserState({type: ActionType.LOGIN_USER, token: newToken, email: userStatus.email})
			} else {
				console.log("something wrong when create new category")
				return null
			}
		}
		if(cateForResister!.category_type === "Expense"){
			dispatchUserState({type: ActionType.ADD_EXPENSE_CATEGORY, newCategory: [cateForResister!]})
		} else {
			dispatchUserState({type: ActionType.ADD_INCOME_CATEGORY, newCategory: [cateForResister!]})
		}
		return cateForResister!
	}

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const amount = parseFloat(amountInputRef.current!.value)
		const date = convertDayToString(transDay)
		const cate: category | null = await isCategoryExist()
		if (cate === null) {return}

		const res = await postTransaction(
			userStatus.tokens!,
			transactionType,
			amount,
			date,
			memoTextAreaRef.current!.value,
			cate.id
		)
	
		// TODO: when register is ok, add the transaction to other graph
	}
	
	return (
		<section className=" absolute w-112 border-2 border-teal-600 rounded-2xl mx-auto bg-white z-40 top-10">
			<button 
				type="button"
				onClick={() => dispatchDisplayStatus({type: ActionType.HIDE_REGISTER})} 
				className="absolute -right-6 -top-6">
				<FontAwesomeIcon icon={faX} className='w-12 h-12 rounded-full bg-white p-2'/>
			</button>
			<h2 className="py-4 text-center rounded-t-xl text-white bg-teal-600">Resister New Transaction</h2>
			<form className="p-4 px-10" onSubmit={(e) => {onSubmit(e)}}>
				<div className="flex justify-between mb-4">
					<button 
						type="button"
						value="Income"
						className={transactionType === "Income" ? selectedButtonStyle : unSelectedButtonStyle}
						onClick={onClickType}
					>
					Income</button>
					<button 
						type="button"
						value="Expense"
						className={transactionType === "Expense" ? selectedButtonStyle : unSelectedButtonStyle}
						onClick={onClickType}
					>
					Expense</button>
				</div>
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Date</label>
					<input 
						type="text"
						value={convertDayToString(transDay)}
						onClick={() => setDatePickerOpened(prev => !prev)}
						required 
						className={`${inputBasicStyle}`} 
					/>
				</div>
				{datePickerOpened && <MiniCalendar date={transDay} setDate={setTransDay} setDatePickerOpened={setDatePickerOpened} />}
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Category</label>
					<input 
						type="text"
						required 
						onChange={(e) => {onChangeCategoryInput(e)}}
						value={transCate}
						onClick={() => setCatePickerOpened(prev => !prev)}
						className={`${inputBasicStyle}`} />
				</div>
				{catePickerOpened && <Category setCategory={setTransCate} setCatePickerOpened={setCatePickerOpened} transType={transactionType}/> }
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Amount ( $ )</label>
					<input type="number" ref={amountInputRef} required className={`${inputBasicStyle}`} />
				</div>
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Note</label>
					<textarea 
						rows={3}
						ref={memoTextAreaRef}
						className="grow p-2 border-2 rounded-md border-gray-300 resize-none" 
					/>
				</div>
				<input 
					type="submit" 
					value="Save"
					className='block w-36 mx-auto p-2 bg-white border-2 border-teal-600 text-teal-700 rounded-full hover:bg-teal-600 hover:text-white duration-200 active:translate-y-1'
				/>
			</form>
		</section>
	)
}

export default Resister