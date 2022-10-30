import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppContext from "../Context/useContext";
import { ActionType } from "../Redux/ActionTypes";


const Header = () => {
	const { userStatus, dispatchUserState } = useContext(AppContext)
	const nav = useNavigate()

	return (
		<div className=" fixed top-0 bg-current w-full px-10 z-40">
			<header className=" w-full max-w-272 mx-auto py-3  ">
				<div className="flex justify-between">
					<button type="button" className="text-white font-fantasy text-3xl" onClick={() => nav('/')} >Expense Tracker</button>
					<div className="flex items-center">
						<p className="text-white">Hi, <span className="border-b border-b-white">{userStatus.loggedIn ? userStatus.email: "Guest"}</span></p>
						{userStatus.loggedIn ? 
							<Link 
								to='/login' 
								className="text-white ml-6 border-2 py-1 px-2 border-black hover:border-2 hover:border-white duration-300"
								onClick={() => {dispatchUserState({type: ActionType.LOGOUT_USER, token: null, email: null})}} 
							>Log out</Link>:
							<Link 
								to='/login' 
								className="text-white ml-6 border-2 py-1 px-2 border-black hover:border-2 hover:border-white duration-300"
							>Login</Link>
						}
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header