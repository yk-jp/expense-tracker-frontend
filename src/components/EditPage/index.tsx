/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategory } from "../../Apis/categoryApi";
import AppContext from "../../Context/useContext";
import { CategoryAll } from "../../Interface/Category";
import { Tokens } from "../../Interface/Token";
import { ActionType } from "../../Redux/ActionTypes";
import Resister from "./Resister";

import CategorySetting from "./Setting";


const EditTransaction = () => {
	
	const { userStatus, dispatchUserState } = useContext(AppContext)
	const nav = useNavigate()
	


	return (
		<div className="flex justify-between max-w-272 mx-auto pt-10" style={{marginTop: '60px'}}>
			<section className="w-1/2">
				<h3 className="text-3xl">Edit Transaction</h3>
				<Resister />
				<button 
					type="button" 
					onClick={() => nav('/')}
					className='block w-36 mx-auto p-2 bg-white border-2 border-black text-black rounded-full hover:bg-black hover:text-white duration-200 active:translate-y-1'
				>
					Back to Home
				</button>

			</section>
			<CategorySetting />
		</div>
	)
}

export default EditTransaction