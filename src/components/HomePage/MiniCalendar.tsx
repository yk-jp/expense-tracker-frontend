/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import { getDays, getDayOfFirst, getMonthName, getDayName } from '../../Utilities/date'

type Props = {
	date: Date,
	setDate: React.Dispatch<React.SetStateAction<Date>>,
	setDatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const MiniCalendar = ({date, setDate, setDatePickerOpened}: Props) => {

	const createTable = ():number[] => {
		const prefixSpace = getDayOfFirst(date.getFullYear(), date.getMonth())
		const table: number[] = []
		for (let i=0; i<prefixSpace; i++){
			table.push(0)
		}
		const n = getDays(date.getFullYear(), date.getMonth())
		for (let i=1; i<=n; i++){
			table.push(i)
		}
		while(true){
			if (table.length % 7 === 0){
				break
			}
			table.push(0)
		}
		return table
	}

	const onClickDatePicked = (e: React.MouseEvent<HTMLButtonElement> ) => {
		const {value} = e.target as HTMLButtonElement
		const day = parseInt(value, 10)
		if (day === 0) { return }

		setDate(prev => new Date(prev.getFullYear(), prev.getMonth(), day))

		// TODO: convert this with reducer
		setDatePickerOpened(false)
	}

	return (
		<div className="border-2 relative mb-4">
			<div className="absolute -top-5 right-6 w-0 h-0 border-b-20 border-l-15 border-r-15 border-slate-200 border-x-transparent "/>
			<p className=" py-1 text-center font-bold text-sm bg-slate-200">
				{`${getMonthName(date.getMonth())} - ${date.getFullYear()}`}
			</p>
			<div className="w-full flex bg-slate-200">
				{[...Array(7)].map((_, idx) => {
					const className = "w-24 text-center text-black py-1 text-sm"
					return (
						<h3 key={getDayName(idx)} className={className}>{getDayName(idx)}</h3>
					)
				})}
			</div>
			<div className="border-box w-full flex flex-wrap">
				{createTable().map(num => (
					<button
						type="button"
						key={num}
						value={num}
						onClick={onClickDatePicked}
						className="w-1/7 h-10 p-2 text-center text-black hover:bg-teal-400 cursor-pointer rounded-full"
					>
						{num === 0 ? "": num}
					</button>
				))}
			</div>
		</div>
	)
}


export default MiniCalendar