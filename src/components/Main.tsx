import React, { useEffect, useState, useContext } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import LineGraph from "./LineGraph";
import MonthlyDetail from "./MonthlyDetail";
import Resister from "./Resister";
import AppContext from "../Context/useContext";
import { ActionType } from "../Redux/ActionTypes";

const Main = () => {
	const { displayStatus, dispatchDisplayStatus } = useContext(AppContext)
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
			{displayStatus.isRegisterShown ?
				<Resister />
				:
				<button type="button" className=" block fixed bottom-[10%] right-[15%]" onClick={() => dispatchDisplayStatus({type: ActionType.OPEN_REGISTER})}>
					<FontAwesomeIcon icon={faPlus} size='4x' className="bg-black rounded-full w-20 h-20 text-white opacity-50 hover:opacity-100 duration-300"/>
				</button>
			}
		</main>
	)
}

export default Main