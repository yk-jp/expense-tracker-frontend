/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import appApi from '../Apis/appApi';
import ErrorPop from './ErrorPop';
import tokens from '../Interface/Token';

const Login = () => {
	const [email, setEmail] = useState<string | null>(null)
	const [password, setPassword] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try{
			const data = await appApi.post('/auth/token/', {
				email,
				password
			})
			localStorage.setItem('expense-tracker-tokens', JSON.stringify(data.data))
			const userToken: tokens = JSON.parse(localStorage.getItem('expense-tracker-tokens') || "") as tokens
		} catch(err) {
			setError("Invalid email and password combination")
		}
	}


	return (
		<div className="w-2/5 min-w-mobile mx-auto mt-20">
			{error && <ErrorPop message={error} setError={setError}/>}
			<div className=' w-32 py-5 rounded-full mx-auto translate-y-16 text-center bg-zinc-700 z-10'>
				<FontAwesomeIcon icon={faUser} size='5x' style={{color: 'white'}} />
				</div>
			<form 
				className='px-20 pt-24 bg-teal-600 rounded-2xl'
				onSubmit={(e) => {onSubmit(e)}}
			>
				<h2 className='text-white text-center mb-6 text-2xl'>Log in</h2>
				<div className='w-full flex align-middle mb-6'>
					<FontAwesomeIcon icon={faEnvelope} size='lg' style={{color: 'white', paddingBlock: '15px', backgroundColor: 'rgb(63 63 70)', width: '50px'}} />
					<input 
						type="email" 
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
				/>
				</div>
				<div className='w-full flex align-middle mb-6'>
					<FontAwesomeIcon icon={faLock} size='lg' style={{color: 'white', paddingBlock: '15px', backgroundColor: 'rgb(63 63 70)', width: '50px'}} />
					<input 
						type="password" 
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
				/>
				</div>
				<div className='flex justify-between'>
					<label className='text-white'>
						<input type="checkbox" />
						Remember me?
					</label>
					<p className='text-white hover:cursor-pointer'>Forgot password?</p>
				</div>
				<p className='text-white text-right hover:cursor-pointer'>Create new account?</p>
				<button 
					type='submit' 
					className='block w-36 mt-10 mx-auto p-5 bg-zinc-700 text-white rounded-full translate-y-8 hover:bg-zinc-300 hover:text-zinc-900 duration-200 active:translate-y-10'
				>Login
				</button>
			</form>
		</div>
)};

export default Login;
