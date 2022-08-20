import React from "react";
import PropTypes from 'prop-types'

type Props = {
	day: number,
	income: number,
	expense: number,
}

const CalenderDay = ({day, income, expense}: Props) => {
	const a = 0

	if (day === 0) {
		return (
			<div className="w-24 border" />
		)
	}
	return (
		<div className="w-24 p-1 border">
			<p className="font-mono">{day}</p>
			<p className="text-right text-cyan-600">{income}</p>
			<p className="text-right text-red-600">-{expense}</p>
			<p className="text-right">{income - expense}</p>
		</div>
	)
}

CalenderDay.propTypes = {
	day: PropTypes.number.isRequired,
	income: PropTypes.number.isRequired,
	expense: PropTypes.number.isRequired
}

export default CalenderDay