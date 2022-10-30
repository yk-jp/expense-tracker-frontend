/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, {useState, useContext, useRef, useEffect, Dispatch} from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";

import postTransaction, { deleteTransaction, updateTransaction } from "../../Apis/transactionApi";
import AppContext from "../../Context/useContext";

import { ActionType } from "../../Redux/ActionTypes";
import { Tokens } from "../../Interface/Token";
import { Category } from "../../Interface/Category";
import { TransactionForFetch } from "../../Interface/Transaction";

import preSetupStyles from "../../Utilities/specialStyledClassName"
import { DeleteSuccess } from "../../Interface/ApiReturns";

type Props = {
	transaction: TransactionForFetch | null,
	setError: Dispatch<string | null>
}

const Resister = ( { transaction, setError }: Props) => {

	const isUpdate = transaction !== null

	const { userStatus, dispatchTransactionStatus, transactionStatus } = useContext(AppContext)
	const nav = useNavigate()

	const amountInputRef = useRef<HTMLInputElement>(null)
	const memoTextAreaRef = useRef<HTMLTextAreaElement>(null)

	const [transactionType, setTransactionType] = useState(transaction?.event || 'Expense')
	const [transDay, setTransDay] = useState(transaction?.date || new Date().toISOString().slice(0, 10))
	const [transCate, setTransCate] = useState<Category | null>(null)
	const [catePickerOpened, setCatePickerOpened] = useState(false)

	const onClickType = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setTransactionType(value)
	}

	const onChangeDateInput = (e: React.FormEvent<HTMLInputElement>) => {
		setTransDay(e.currentTarget.value)
	}

	const tryResister = async (token: Tokens) => {
		if(!transCate) return

		const amount = parseFloat(amountInputRef.current!.value)
		const date = transDay
		const cate = transCate


		const res = await postTransaction(
			token,
			transactionType,
			amount,
			date,
			memoTextAreaRef.current!.value,
			cate.id,
			cate.name
		)

		if (Object.prototype.hasOwnProperty.call(res, 'refresh')) {
			const newToken = res as Tokens
			if (newToken.access === null) {
				// TODO: popup error message need to log in again
				nav('/login')
			} else {
				await tryResister(newToken)
				return
			}
		}

		dispatchTransactionStatus({type: ActionType.UPDATE_TRANSACTION_MONTH})
	}

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (isUpdate) {
			const data = await updateTransaction(
				userStatus.tokens!, 
				transaction.id, 
				transactionType, 
				parseFloat(amountInputRef.current!.value), 
				transDay, 
				memoTextAreaRef.current!.value, 
				transCate!.id, 
				transaction.date
			)
			if (data) {
				dispatchTransactionStatus({type: ActionType.UPDATE_TRANSACTION_MONTH})
				nav('/')
				setError("error")
				return
			}
		}
		await tryResister(userStatus.tokens!)
		nav('/')
	}

	const onDelete = async () => {
		if (transaction) {
			const res: DeleteSuccess = await deleteTransaction(userStatus.tokens!, transaction.id, transDay)
			if (res.is_success) {
				dispatchTransactionStatus({type: ActionType.UPDATE_TRANSACTION_MONTH})
				nav('/')
			}
		}
	}
	
	useEffect(() => {
		if (transaction) {
			amountInputRef.current!.value = transaction.amount.toString()
			memoTextAreaRef.current!.value = transaction.memo
			if (transaction.event === 'Income') {
				const cate = userStatus.category.income.filter(c => c.name === transaction.category)
				setTransCate(cate[0])
			} else {
				const cate = userStatus.category.expense.filter(c => c.name === transaction.category)
				setTransCate(cate[0])
			}
		}
	}, [])


	return (
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			<form className="py-10 pb-0" onSubmit={(e) => {onSubmit(e)}}>
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
				<div className={preSetupStyles.inputRowStyle}>
					<label htmlFor="date" className={`${preSetupStyles.labelBasicStyle}`}>Date</label>
					<input 
						id="date"
						type='date'
						value={transDay}
						onChange={onChangeDateInput}
						required 
						className={`${preSetupStyles.inputBasicStyle}`} 
					/>
				</div>
				<div className={preSetupStyles.inputRowStyle}>
					<label htmlFor="category" className={`${preSetupStyles.labelBasicStyle}`}>Category</label>
					<input 
						id="category"
						type="text"
						required 
						value={transCate ? transCate.name : ''}
						onClick={() => setCatePickerOpened(prev => !prev)}
						className={`${preSetupStyles.inputBasicStyle}`} />
				</div>
				{ catePickerOpened && 
					<Categories setCategory={setTransCate} setCatePickerOpened={setCatePickerOpened} transType={transactionType} />
				}
				<div className={preSetupStyles.inputRowStyle}>
					<label htmlFor="amount" className={`${preSetupStyles.labelBasicStyle}`}>Amount ( $ )</label>
					<input id="amount" type="number" ref={amountInputRef} required className={`${preSetupStyles.inputBasicStyle}`} />
				</div>
				<div className={preSetupStyles.inputRowStyle}>
					<label htmlFor="note" className={`${preSetupStyles.labelBasicStyle}`}>Note</label>
					<textarea 
						id="note"
						rows={3}
						ref={memoTextAreaRef}
						className="grow p-2 mb-5 border-2 rounded-md border-gray-300 resize-none" 
					/>
				</div>
				<input 
					type="submit" 
					value="Save"
					className='block w-36 mx-auto mb-5 p-2 bg-white border-2 border-teal-600 text-teal-700 rounded-full hover:bg-teal-600 hover:text-white duration-200 active:translate-y-1'
				/>
				{ isUpdate && 
					<button 
						onClick={() => onDelete()}
						type="button"
						className='block w-36 mx-auto mb-5 p-2 bg-white border-2 border-red-400 text-red-500 rounded-full hover:bg-red-400 hover:text-white duration-200 active:translate-y-1'
					>Delete</button>
			
				}
			</form>
	)
}

export default Resister