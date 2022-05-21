import React from "react";

function Modal(){

	let [isSignUp, setIsSignUp] = React.useState(true)

	let syleForHideSectionTitle = {
		"fontSize": "20px",
		"padding": "40px"
	}

	function toggleModalMode(){
		setIsSignUp(pre=>{
			return !pre
		})
	}

	return(
		<div className="modal">
			<div className= {isSignUp ? "modal_sign-up-show" : "modal_sign-up-hide"} onClick={toggleModalMode}>
				<h2 className="modal_title" style={isSignUp ? {}: syleForHideSectionTitle}>Sign Up</h2>
					<div>
						<p className="modal_error">Email has been registered already</p>
						<form className="modal_form-area">
							<input className="modal_form-area_item" type="email" name="email" id="" placeholder="Email"/>
							<input className="modal_form-area_item" type="text" name="userName" id="" placeholder="User Name"/>
							<input className="modal_form-area_item" type="password" name="password" id="" placeholder="Password" />
							<input className="modal_form-area_item" type="submit" value="Sign Up" />
						</form>
					</div>
			</div>
			<div className={isSignUp ? "modal_log-in-hide": "modal_log-in-show"} onClick={toggleModalMode}>
				<h2 className="modal_title" style={isSignUp ? syleForHideSectionTitle : {}}>Log In</h2>	
					<div>
						<p className="modal_error">Incorrect password</p>
						<form className="modal_form-area">
							<input className="modal_form-area_item" type="email" name="email" id="" placeholder="Email"/>
							<input className="modal_form-area_item" type="password" name="password" id="" placeholder="Password"/>
							<input className="modal_form-area_item" type="submit" value="Log In" />
						</form>
						<p className="modal_log-in_reset-password">Forget your password?</p>
					</div>
			</div>
		</div>
	)
}

export default Modal