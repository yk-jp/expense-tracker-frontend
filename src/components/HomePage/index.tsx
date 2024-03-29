/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Calender from "./Calender";
import LineGraph from "./LineGraph";
import MonthlyDetail from "./MonthlyDetail";

import AppContext from "../../Context/useContext";

import { ActionType } from "../../Redux/ActionTypes";
import { fetchCategory } from "../../Apis/categoryApi";
import { CategoryAll } from "../../Interface/Category";
import { Tokens } from "../../Interface/Token";
import { UserInfo } from "../../Interface/UserInfo";

const Main = () => {
	const {dispatchUserState, userStatus } = useContext(AppContext)
	const nav = useNavigate()

	if (!userStatus.loggedIn) { nav('/login') }

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
			const localData = localStorage.getItem('userInfo')
			if (!localData) {
				nav('/login')
			} else {
				const userInfo: UserInfo = JSON.parse(localData)
				// TODO use refresh token to get new token
				dispatchUserState({type: ActionType.LOGIN_USER, token: userInfo.tokens, email: userInfo.email})
			}
		} else {
			getCategory().catch(console.error)
		}
	}, [userStatus.loggedIn])

	return (
		<main className="flex justify-center min-w-272" style={{marginTop: '60px'}}>
			<div className=" mr-8 mb-10">
				<Calender />
				<LineGraph />
			</div>
			<div className="py-4">
				<MonthlyDetail />
			</div>
		</main>
	)
}

export default Main