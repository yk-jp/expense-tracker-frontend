import React, {useState} from "react";

interface transaction{
	event: string,
	amount: number,
	date: string,
	memo: string | null,
	category: number
}

interface dayDetail{
	day: string,
	income: number
	expense: number
}

const Calender = () => {

	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const daysColorPallet = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500", "bg-cyan-500", "bg-blue-500"]

	const getFirstDay = (year: number, month: number): number => (
		new Date(year, month, 1).getDay()
	)


	const [targetMonth, setTargetMonth] = useState<Date>(new Date())
	const [dailyTransactions, setDailyTransactions] = useState<dayDetail[]>([])

	const createTable = () => {
		const prefixSpace = getFirstDay(targetMonth.getFullYear(), targetMonth.getMonth())
		const temp: dayDetail[] = []
		for(let i=0; i<prefixSpace; i+1){
			temp.push({day: "", income: 0, expense: 0})
		}
	}


	const transactions: transaction[] = [
		{event: "test", amount: 300, date: '2022-8-10', memo: "", category: 10},
		{event: "test", amount: 100, date: '2022-8-11', memo: "", category: 20},
		{event: "test", amount: 300, date: '2022-8-13', memo: "", category: 10},
		{event: "test", amount: 200, date: '2022-8-14', memo: "", category: 20},
		{event: "test", amount: 100, date: '2022-8-10', memo: "", category: 10}
	]


	return(
		<div className="w-168 mx-auto">
			<h2 className="text-center text-2xl">
				hello
			</h2>
			<div className="w-full flex">
				days
			</div>

		</div>
	)
}

export default Calender