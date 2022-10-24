/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import ErrorPop from '../ErrorPop';

import AppContext from "../../Context/useContext";

import { signInApi } from '../../Apis/accountApi';
import { ActionType } from '../../Redux/ActionTypes';
import { RegisterAccountFailed } from '../../Interface/ApiReturns';
import { Tokens } from '../../Interface/Token';

const SignIn = () => {
	const nav = useNavigate()
	const { dispatchUserState } = useContext(AppContext)
	const [email, setEmail] = useState<string | null>(null)
	const [password, setPassword] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (!email || !password) return

		const res: Tokens | RegisterAccountFailed = await signInApi(email, password)
		if (Object.keys(res).length === 2){
			const success = res as Tokens
			dispatchUserState({type: ActionType.LOGIN_USER, token: success, email})
			nav('/')
		} else {
			const failed = res as RegisterAccountFailed
			setError(failed.response.data.message)
		}
	}


	return (
		<section className="w-2/5 min-w-mobile mx-auto mt-20">
			{error && <ErrorPop message={error} setError={setError}/>}
			<div className=' w-32 py-5 rounded-full mx-auto translate-y-16 text-center bg-zinc-700 z-10'>
				<FontAwesomeIcon icon={faUser} size='5x'className='text-white' />
				</div>
			<form 
				className='px-20 pt-24 bg-sky-600 rounded-2xl'
				onSubmit={(e) => {onSubmit(e)}}
			>
				<h2 className='text-white text-center mb-6 text-2xl'>Sign In</h2>
				<div className='w-full flex align-middle mb-6'>
					<FontAwesomeIcon icon={faEnvelope} size='lg' className='text-white bg-zinc-700 py-4' style={{ width: '50px'}} />
					<input 
						type="email" 
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
				/>
				</div>
				<div className='w-full flex align-middle mb-6'>
					<FontAwesomeIcon icon={faLock} size='lg' className='text-white bg-zinc-700 py-4' style={{width: '50px'}} />
					<input 
						type="password" 
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
				/>
				</div>
				<Link className='text-white text-right hover:cursor-pointer block' to="/login">Already have an account?</Link>
				<button 
					type='submit' 
					className='block w-36 mt-10 mx-auto p-5 bg-zinc-700 text-white rounded-full translate-y-8 hover:bg-zinc-300 hover:text-zinc-900 duration-200 active:translate-y-10'
				>Sign In
				</button>
			</form>
		</section>
)};

export default SignIn;
