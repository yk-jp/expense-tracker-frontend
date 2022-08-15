/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const Login = () => (
  <div className="">
		<div className='w-20 bg-slate-500'><FontAwesomeIcon icon={faUser} size='5x' style={{color: 'white'}} /></div>
		<form>
			<input type="email" placeholder='Email'/>
			<input type="password" placeholder='Password' />
			<div>
				<label>
					<input type="checkbox"/>
					Remember me?
				</label>
				<p>Forgot Password?</p>
			</div>
		</form>
		<button type='submit' onClick={()=>{console.log('here')}} >Login</button>
  </div>
);

export default Login;
