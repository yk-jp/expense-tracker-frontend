import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import LineGraph from "./LineGraph";
import MonthlyDetail from "./MonthlyDetail";

const Main = () => {
	const [stats, setStatus] = useState(true)
	const nav = useNavigate()


	useEffect(()=>{
		if (stats === false) {
			nav('/login')
		}
	}, [nav, stats])

	return (
		<main className="flex justify-center min-w-272" style={{marginTop: '60px'}}>
			<div className=" mr-8 mb-10">
				<Calender />
				<LineGraph />
			</div>
			<div className="py-4 sticky" style={{height: 'calc(100vh - 60px)', top: '60px'}}>
				<MonthlyDetail />
			</div>
		</main>
	)
}

export default Main