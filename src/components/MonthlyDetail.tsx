/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, {useState, useContext, useEffect} from "react";
import DoughnutChart from "./DoughnutChart";
import PickMonthHeader from "./PickMonthHeader";
import AppContext from "../Context/useContext";
import { colorPicker } from "../Utilities/colorPallet";
import { getOnlyDateNum } from "../Utilities/date";
import { TransactionForFetch, CategorizedTransactions } from "../Interface/Transaction";
import { fetchTransaction } from "../Apis/transactionApi";
import { ActionType } from "../Redux/ActionTypes";
import preSetupStyles from "../Utilities/specialStyledClassName"
import Loading from "./Loading";

const MonthlyDetail = () => {
	const { transactionStatus, userStatus, dispatchTransactionStatus } = useContext(AppContext)

	// FIXME: this doesn't work
	const [categorizedTransactions, setCategorizedTransactions] = useState<CategorizedTransactions[] | null>(null)
	
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

	const organizeTransactionsByCategory = () => {
		const categorized: CategorizedTransactions[] = []
		const aimEvent = transTypeIncome ? "Income" : "Expense"
		transactionStatus.monthlyForDetail.transactions.forEach(trans => {
			if (trans.event === aimEvent) {
				if (categorized.length === 0){
					categorized.push({name: trans.category, totalAmount: parseInt(trans.amount, 10), transactions: [trans]})
				} else {
					let foundCategory = false
					for (let i=0; i<categorized.length; i++){
						if (categorized[i].name === trans.category) {
							categorized[i].totalAmount +=  parseInt(trans.amount, 10)
							categorized[i].transactions.push(trans)
							foundCategory = true
							break
						}
					}
					if (!foundCategory) {
						categorized.push({name: trans.category, totalAmount: parseInt(trans.amount, 10), transactions: [trans]})
					}
				}
			}
		})
		setCategorizedTransactions(categorized)
	}

	useEffect(()=> {
		if(userStatus.tokens === null) { return }
		// TODO: handle token expire pattern
		const fetchData = async() => {
			const year = targetMonth.getFullYear().toString()
			const month = (targetMonth.getMonth() + 1).toString()
			const data = await fetchTransaction(userStatus.tokens!, year, month)
			if(data !== null){
				dispatchTransactionStatus({
					type: ActionType.ADD_TRANSACTION_MONTH_FOR_DETAIL,
					newTrans: data.result.all_transactions,
					month,
					year
				})
			}
		}

		fetchData().then(()=>{
			organizeTransactionsByCategory()
		}).catch(console.error)

	}, [targetMonth, userStatus.tokens])

	useEffect(() => {
		organizeTransactionsByCategory()
	}, [transTypeIncome, transactionStatus.monthlyForDetail])

	return (
		<section className="border-4 w-96 h-full overflow-scroll" >
			<PickMonthHeader date={targetMonth} setDate={setTargetMonth} />
			<div className="p-4">
				<button 
					type="button" 
					className={transTypeIncome ? preSetupStyles.activeButtonStyle : preSetupStyles.unActiveButtonStyle}
					value="Income"
					onClick={onClickChangeTransType}
				>Income</button>
				<button 
					type="button"
					className={transTypeIncome ? preSetupStyles.unActiveButtonStyle : preSetupStyles.activeButtonStyle}
					value="Expense"
					onClick={onClickChangeTransType}
				>Expense</button>
			</div>
			{ categorizedTransactions ? 
				<div>
					<DoughnutChart 
					data={categorizedTransactions}
					transType={transTypeIncome ? "Income" : "Expense"}
					/>
					<div className="">
						{categorizedTransactions.map((cate, idx) => (
							<div className="px-10">
								<div className="p-2 rounded-md" style={{backgroundColor: colorPicker(idx)}}>
									<button 
										type="button" 
										className="w-1/2 text-left font-bold text-white"
										onClick={onClickChangeDetailedCate} 
										value={cate.name}
									>{cate.name}</button>
									<button 
										type="button"
										className="w-1/2 text-right font-bold text-white" 
										onClick={onClickChangeDetailedCate} 
										value={cate.name}
									>${cate.totalAmount}</button>
								</div>
								{cate.transactions.map(trans => (
									<div className={trans.category === detailedCate ? preSetupStyles.shownCategoryStyle : preSetupStyles.noShownCategoryStyle}>
										<p className="mr-3 text-xs">{getOnlyDateNum(trans.date)}</p>
										<p className="w-4/5 text-sm">{trans.memo}</p>
										<p className="w-1/5 text-right text-sm">${trans.amount}</p>
									</div>
								))}
							</div>
						))}
				</div>
			</div>
			:
				<Loading height="75vh" />
			}
		</section>
	)
}

export default MonthlyDetail