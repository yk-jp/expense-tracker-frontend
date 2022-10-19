/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Calender from "./Calender";
import LineGraph from "./LineGraph";
import MonthlyDetail from "./MonthlyDetail";
import Resister from "./Resister";
import AppContext from "../Context/useContext";
import { ActionType } from "../Redux/ActionTypes";
import { fetchCategory } from "../Apis/categoryApi";
import { CategoryAll } from "../Interface/Category";
import { Tokens } from "../Interface/Token";

const Main = () => {
	const { displayStatus, dispatchDisplayStatus, dispatchUserState, userStatus, dispatchTransactionStatus } = useContext(AppContext)
	const nav = useNavigate()

	useEffect(()=>{
		// TODO: exclude token expire pattern because it's right after login
		const getCategory = async () => {
			const data = await fetchCategory(userStatus.tokens!)
			if (Object.prototype.hasOwnProperty.call(data, 'income')) {
				const allCate = data as CategoryAll
				dispatchUserState({type: ActionType.ADD_INCOME_CATEGORY, newCategory: allCate.income})
				dispatchUserState({type: ActionType.ADD_EXPENSE_CATEGORY, newCategory: allCate.expense})
			} else if (Object.prototype.hasOwnProperty.call(data, 'refresh')){
				const token = data as Tokens
				dispatchUserState({type: ActionType.LOGIN_USER, token, email: userStatus.email})
			}
		}

		if (userStatus.loggedIn === false) {
			nav('/login')
		} else {
			getCategory().catch(console.error)
		}
	}, [])

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