import React from "react"
import PropTypes from 'prop-types'

type Props = {
	message: string
	setError: React.Dispatch<React.SetStateAction<string| null>>
}

const ErrorPop = ({ message, setError }: Props) => {
	// TODO: make this compoent as flexible as possible
	const i = 0
	return(
		<div 
			className="bg-rose-400 text-center p-5 rounded-md absolute w-2/5 min-w-mobile errorMessage"
			onAnimationEnd={() => setError(null)}
		>
			<p className="text-white">{message}</p>
		</div>
	)
}

// TODO: jadjflaksdjfa;

ErrorPop.propTypes = {
  message: PropTypes.string.isRequired,
	setError: PropTypes.func.isRequired
};


export default ErrorPop