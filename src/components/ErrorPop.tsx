import React from "react"
import PropTypes from 'prop-types'

type Props = {
	message: string
}

const ErrorPop = ({ message }: Props) => {
	const i = 0
	return(
		<div className="">{message}</div>
	)
}

ErrorPop.propTypes = {
  message: PropTypes.string.isRequired
};


export default ErrorPop