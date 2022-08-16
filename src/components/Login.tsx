/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


const Login = () => (
  <div className="w-2/5 min-w-mobile mx-auto mt-20">
		<div className=' w-32 py-5 rounded-full mx-auto translate-y-16 text-center bg-zinc-700 z-10'>
			<FontAwesomeIcon icon={faUser} size='5x' style={{color: 'white'}} />
			</div>
		<form className='px-20 py-28 bg-teal-600 rounded-2xl'>
			<div className='w-full flex align-middle mb-6'>
				<FontAwesomeIcon icon={faEnvelope} size='lg' style={{color: 'white', paddingBlock: '15px', backgroundColor: 'rgb(63 63 70)', width: '50px'}} />
				<input 
					type="email" 
					placeholder='Email'
					className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
			/>
			</div>
			<div className='w-full flex align-middle mb-6'>
				<FontAwesomeIcon icon={faLock} size='lg' style={{color: 'white', paddingBlock: '15px', backgroundColor: 'rgb(63 63 70)', width: '50px'}} />
				<input 
					type="password" 
					placeholder='Password'
					className='block flex-1 pl-6 bg-zinc-600 text-white focus:bg-white focus:text-zinc-900'
			/>
			</div>
			<div className='flex justify-between'>
				<label className='text-white'>
					<input type="checkbox" />
					Remember me?
				</label>
				<p className='text-white'>Forgot Password?</p>
			</div>
		</form>
		<button 
			type='submit' 
			className='block w-36 mx-auto p-5 bg-zinc-700 text-white -translate-y-8 rounded-full hover:bg-zinc-300 hover:text-zinc-900 duration-200 active:-translate-y-6'
			onClick={()=>{console.log('here')}} 
		>Login
		</button>
  </div>
);

export default Login;
