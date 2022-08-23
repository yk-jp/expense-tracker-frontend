import React, { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'

const HEIGHT = 180
const period = ['1 Month', '3 Months', '6 Months', '1 Year']


const BarGraph = () => {
	const [openedMenu, setOpenedMenu] = useState(false)
	const [target, setTarget] = useState('1 Month')

	const periodIncome = 2400
	const periodExpense = 200

	const calcBarHeight = (income: number, expense: number): number[] => {
		const isDeficit = income < expense
		const ratio = isDeficit ? income / expense : expense / income
		
		const lowHight = HEIGHT * ratio
		if (isDeficit) {
			return [lowHight, 180]
		} 
		return [180, lowHight]
	}

	const onClickButton = () => {
		setOpenedMenu(prev => !prev)
	}

	const onClickPeriod = (e: React.MouseEvent<HTMLButtonElement>) => {
		const et = e.target as HTMLButtonElement
		setTarget(et.value)
		onClickButton()
	}

	const barHeights = calcBarHeight(periodIncome, periodExpense)
	const incomeBarH = barHeights[0]
	const expenseBarH = barHeights[1]


	return (
		<div className="border-4 w-1/3 mx-auto relative">
			<div className="flex justify-between items-center p-3">
				<h3 className="border-b-2 border-teal-400 text-lg">Cash flow of Recent <span className="font-extrabold ">{target}</span></h3>
				<button type="button" onClick={onClickButton}>
					<FontAwesomeIcon icon={faChartColumn} size='lg' style={{color: 'black'}} />	
				</button>
			</div>

			{ openedMenu && 
			<div className=" absolute top-12 right-3 flex flex-col items-end bg-black p-3 rounded-xl" >
			{period.map(term => (
				<button 
					key={term} 
					type="button"
					value={term}
					onClick={onClickPeriod}
					className="block text-white border p-1 border-white mb-1 rounded hover:bg-white hover:text-black"
				>
					{term}
				</button>
			))}
		</div>
			}

			<p className="px-3 text-2xl font-bold">${periodIncome - periodExpense}</p>
			<div className="flex w-full p-3 items-end">
				<div className="w-7/12 -mr-12">
					<p className="text-xs">Income</p>
					<p className="text-sm font-semibold mb-2">${periodIncome}</p>
					<div className=" bg-cyan-400 rounded-t-lg" style={{height: `${incomeBarH}px`}}/>
				</div>
				<div className="w-7/12 text-right">
					<p className="text-xs">Expense</p>
					<p className="text-sm font-semibold mb-2">${periodExpense}</p>
					<div className="bg-red-400 z-10 rounded-t-lg" style={{height: `${expenseBarH}px`}} />
				</div>
			</div>
		</div>
	)
}

export default BarGraph