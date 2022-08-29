import React, { useState } from "react";
import { Link } from "react-router-dom";



const Header = () => {
	const [status, setStatus] = useState(true)

	return (
		<div className=" fixed top-0 bg-current w-full px-10 z-50">
			<header className=" w-full max-w-272 mx-auto py-3  ">
				<div className="flex justify-between">
					<p className="text-white font-fantasy text-3xl">Expense Tracker</p>
					<div className="flex items-center">
						<p className="text-white">Hi, <span className="border-b border-b-white">{status ? "Email": "Guest"}</span></p>
						{status ? 
							<Link to='/login' className="text-white ml-6 border-2 py-1 px-2 border-black hover:border-2 hover:border-white duration-300">Log out</Link>:
							<Link to='/login' className="text-white ml-6 border-2 py-1 px-2 border-black hover:border-2 hover:border-white duration-300">Login</Link>
						}
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header