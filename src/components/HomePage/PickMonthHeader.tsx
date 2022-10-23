/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { getMonthName } from "../../Utilities/date";

type Props = {
	date: Date,
	setDate: React.Dispatch<React.SetStateAction<Date>>
}

const PickMonthHeader = ({ date, setDate }: Props) => {

	const onClickChangeMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
		const et = e.currentTarget as HTMLButtonElement
		let next: number
		if (et.value === "add") {
			next = 1
		} else {
			next = -1
		}
		setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + next))
	}

	return (
		<div className="flex w-full justify-center">
			<button type="button" value="sub" onClick={onClickChangeMonth}>
				<FontAwesomeIcon 
					icon={faCaretLeft} 
					size='lg'
					className="text-black p-2 pb-0"
				/>
			</button>
			<h2 className="text-xl py-2 pb-0 px-5 border-b-2 border-b-teal-500">{getMonthName(date.getMonth())}, {date.getFullYear()}</h2>
			<button type="button" value="add" onClick={onClickChangeMonth}>
				<FontAwesomeIcon 
					icon={faCaretRight}
					size='lg' 
					className="text-black p-2 pb-0"
				/>
			</button>
		</div>
	)
}

export default PickMonthHeader