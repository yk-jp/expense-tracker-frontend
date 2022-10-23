import React from "react";

type Props = {
	day: number,
	income: number,
	expense: number,
}

const CalenderDay = ({day, income, expense}: Props) => {

	if (day === 0) {
		return (
			<div className="w-24 border " />
		)
	}
	
	if(income === 0 && expense === 0){
		return (
			<div className="w-24 p-1 border h-24"><p className="font-mono">{day}</p></div>
		)
	}
	
	return (
		<div className="w-24 p-1 border h-24">
			<p className="font-mono -mb-3">{day}</p>
			<p className="text-right text-cyan-600 text-sm">{income}</p>
			<p className="text-right text-red-600 text-sm">-{expense}</p>
			<p className="text-right">{income - expense}</p>
		</div>
	)
}


export default CalenderDay