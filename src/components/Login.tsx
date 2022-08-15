/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const Login = () => (
  <div className="">
		<div><i className='fa-solid fa-user' /></div>
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
