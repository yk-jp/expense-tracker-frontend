/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useRef} from "react";
import MiniCalendar from "./MiniCalendar";
import Category from "./Category";


const inputRowStyle = "flex mb-4"
const labelBasicStyle = " w-1/3 block "
const inputBasicStyle = "grow block text-right bg-white border-b-2 border-b-gray-300 hover:border-b-gray-500 focus:border-b-gray-500"
const selectedButtonStyle = "w-2/5 text-center py-1 border-2 border-orange-500 text-orange-500 rounded-md"
const unSelectedButtonStyle = "w-2/5 text-center py-1 border-2 border-gray-300 text-gray-400 rounded-md hover:text-gray-600 hover:border-gray-500"


const Resister = () => {

	const [transactionType, setTransactionType] = useState("Expense")
	const [transDay, setTransDay] = useState(new Date())

	const onClickType = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value} = e.target as HTMLButtonElement
		setTransactionType(value)
	}

	
	return (
		<section className="w-112 border-2 border-teal-600 rounded-2xl mx-auto">
			<h2 className="py-4 text-center rounded-t-xl text-white bg-teal-600">Resister New Transaction</h2>
			<form className="p-4 px-10">
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
					<input type="text" disabled required className={`${inputBasicStyle}`} />
				</div>
				<MiniCalendar />
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Category</label>
					<input type="text" disabled required className={`${inputBasicStyle}`} />
				</div>
				<Category />
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Amount</label>
					<input type="number" required className={`${inputBasicStyle}`} />
				</div>
				<div className={inputRowStyle}>
					<label className={`${labelBasicStyle}`}>Note</label>
					<textarea rows={3} className="grow p-2 border-2 rounded-md border-gray-300 resize-none" />
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