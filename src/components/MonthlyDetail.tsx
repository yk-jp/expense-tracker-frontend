import React, {useState} from "react";
import DoughnutChart from "./DoughnutChart";
import { colorPicker } from "../Utilities/colorPallet";
import { getOnlyDateNum } from "../Utilities/date";
import transaction from "../Interface/Transaction";
import categorizedTransaction from "../Interface/CategorizedTransactions";
import PickMonthHeader from "./PickMonthHeader";

const activeButtonClassName = "w-1/2 pb-2 border-b-cyan-500 border-b-4 ease-in duration-100"
const inactiveButtonClassName = "w-1/2 pb-2 text-slate-400 border-b-4 ease-in duration-100 "

const shownCategoryClassName = " ml-4 py-1 px-2 flex border-b duration-500 items-end"
const noShownCategoryClassName = "h-0 overflow-hidden"

const sample: categorizedTransaction[] = [{
	name: 'food',
	totalAmount: 500,
	transactions: [{
			id: 1,
			category: 'food',
			event: 'expense',
			amount: '200',
			memo: "ice cream",
			date: '2020/3/4'
		},
		{
			id: 2,
			category: 'food',
			event: 'expense',
			amount: '300',
			memo: "T & T",
			date: '2020/3/4'
		}
	]
	},
	{
		name: 'hang out',
		totalAmount: 300,
		transactions: [{
				id: 1,
				category: 'hang out',
				event: 'expense',
				amount: '100',
				memo: "with A",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
			{
				id: 2,
				category: 'hang out',
				event: 'expense',
				amount: '200',
				memo: "BBQ",
				date: '2020/3/4'
			},
		]
	},
]

const MonthlyDetail = () => {
	const [transTypeIncome, setTransTypeIncome] = useState(true)
	const [detailedCate, setDetailedCate] = useState<string>("")
	const [targetMonth, setTargetMonth] = useState(new Date())

	const onClickChangeDetailedCate = (e: React.MouseEvent<HTMLButtonElement>) => {
		const et = e.target as HTMLButtonElement
		if (et.value === detailedCate) {
			setDetailedCate("")
		} else {
			setDetailedCate(et.value)
		}
	}


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
		<section className="border-4 w-96 h-full overflow-scroll" >
			<PickMonthHeader date={targetMonth} setDate={setTargetMonth} />
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
			<div className="">
				{sample.map((cate, idx) => (
					<div className="px-10">
						<div className="p-2 rounded-md" style={{backgroundColor: colorPicker(idx)}}>
							<button 
								type="button" 
								className="w-1/2 text-left font-bold text-gray-700"
								onClick={onClickChangeDetailedCate} 
								value={cate.name}
							>{cate.name}</button>
							<button 
								type="button"
								className="w-1/2 text-right font-bold text-gray-700" 
								onClick={onClickChangeDetailedCate} 
								value={cate.name}
							>${cate.totalAmount}</button>
						</div>
						{cate.transactions.map(trans => (
							<div className={trans.category === detailedCate ? shownCategoryClassName : noShownCategoryClassName}>
								<p className="mr-3 text-xs">{getOnlyDateNum(trans.date)}</p>
								<p className="w-4/5 text-sm">{trans.memo}</p>
								<p className="w-1/5 text-right text-sm">${trans.amount}</p>
							</div>
						))}
					</div>
					
				))}
			</div>
		</section>
	)
}

export default MonthlyDetail