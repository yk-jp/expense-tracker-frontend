/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useEffect, useState, useContext} from "react";

import CalenderDay from './CalenderDay'
import PickMonthHeader from "./PickMonthHeader";

import AppContext from "../../Context/useContext";
import { getDays, getDayOfFirst, getDayName } from '../../Utilities/date'

import { TransactionForFetch } from "../../Interface/Transaction";

import { fetchTransaction } from "../../Apis/transactionApi";
import { ActionType } from "../../Redux/ActionTypes";

interface dayDetail{
	id: number,
	day: number,
	income: number
	expense: number
}

const Calender = () => {

	const daysColorPallet = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500", "bg-cyan-500", "bg-blue-500"]
	const { transactionStatus, userStatus, dispatchTransactionStatus } = useContext(AppContext)
	const [targetMonth, setTargetMonth] = useState<Date>(new Date())
	const [dailyTransactions, setDailyTransactions] = useState<dayDetail[]>([])


	const reduceTransactionsByEachDay = (transactions: TransactionForFetch[]): Map<number, TransactionForFetch[]> => {
		const map = new Map<number, TransactionForFetch[]>()

		for (const t of transactions) {
			const fd = t.date.split("-")
			const d: number = parseInt(fd[2], 10)

			if (map.has(d)){
				const prev = map.get(d)
				prev!.push(t)
				map.set(d, prev!)
			} else {
				map.set(d, [t])
			}
		}
		return map
	}	

	const createTable = () => {
		const prefixSpace = getDayOfFirst(targetMonth.getFullYear(), targetMonth.getMonth())
		const reducedTransaction = reduceTransactionsByEachDay(transactionStatus.monthlyForCalendar.transactions)
		const temp: dayDetail[] = []
		let idK = 0
		for(let i=0; i<prefixSpace; i++){
			temp.push({id: idK, day: 0, income: -1, expense: -1})
			idK += 1
		}
		const n = getDays(targetMonth.getFullYear(), targetMonth.getMonth())
		for (let i=1; i<=n; i++ ){
			const trans = reducedTransaction.get(i)
			if (!trans){
				temp.push({id: idK, day: i, income: 0, expense:0})
				idK += 1
			}
			else{
				let ic = 0
				let ex = 0
				for (const t of trans){
					if (t.event === "Income"){
						ic += parseFloat(t.amount)
					} else {
						ex += parseFloat(t.amount)
					}
				}
				temp.push({id: idK, day: i, income: ic, expense: ex})
				idK += 1
			}
		}
		while (true){
			if (temp.length % 7 === 0){
				break
			}
			temp.push({id: idK, day: 0, income: 0, expense: 0})
			idK += 1
		}
		setDailyTransactions(temp)
	}

	// TODO: handle token expire
	useEffect(()=> {
		if(userStatus.tokens === null) { return }
		const fetchData = async() => {
			const year = targetMonth.getFullYear().toString()
			const month = (targetMonth.getMonth() + 1).toString()
			const data = await fetchTransaction(userStatus.tokens!, year, month)
			if(data !== null){
				dispatchTransactionStatus({
					type: ActionType.ADD_TRANSACTION_MONTH_FOR_CALENDAR,
					newTrans: data.result.all_transactions,
					month, year,
					fetchSuccess: true
				})
			}
		}

		fetchData().catch(console.error)
		createTable()

	}, [targetMonth, userStatus.tokens])

	useEffect(() => {
		createTable()
	}, [transactionStatus.monthlyForCalendar])

	return(
		<section className="w-168">
				<PickMonthHeader date={targetMonth} setDate={setTargetMonth} />
				<div className="w-full flex mt-3">
					{[...Array(7)].map((_, idx) => {
						let className = "w-24 text-center text-white py-1"
						className += ` ${daysColorPallet[idx]}`
						return (
							<h3 key={getDayName(idx)} className={className}>{getDayName(idx)}</h3>
						)
					})}
				</div>
				<div className=" box-border w-full flex flex-wrap">
					{dailyTransactions.map( day => (
						<CalenderDay key={day.id} day={day.day} income={day.income} expense={day.expense} />
					))}
				</div>
		</section>
	)
}

export default Calender