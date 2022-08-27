import React, {useState} from "react";
import DoughnutChart from "./DoughnutChart";





const activeButtonClassName = "w-1/2 pb-2 border-b-cyan-500 border-b-4 ease-in duration-100"
const inactiveButtonClassName = "w-1/2 pb-2 text-slate-400 ease-in duration-100 "



const MonthlyDetail = () => {
	const [transTypeIncome, setTransTypeIncome] = useState(true)


	const onClickChangeTransType = (e: React.MouseEvent<HTMLButtonElement>) => {
		const et = e.target as HTMLButtonElement
		if (et.value === "Income") {
			setTransTypeIncome(true)
		} else if (et.value === "Expense") {
			setTransTypeIncome(false)
		} else {
			console.log("error")
		}
	}

	return (
		<div className="border-4 w-1/3 mx-auto">
			<div className="p-4">
				<button 
					type="button" 
					className={transTypeIncome ? activeButtonClassName : inactiveButtonClassName}
					value="Income"
					onClick={onClickChangeTransType}
				>Income</button>
				<button 
					type="button"
					className={transTypeIncome ? inactiveButtonClassName : activeButtonClassName}
					value="Expense"
					onClick={onClickChangeTransType}
				>Expense</button>
			</div>
			<DoughnutChart />
		</div>
	)
}

export default MonthlyDetail