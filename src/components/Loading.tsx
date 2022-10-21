import React from "react";
import ReactLoading from 'react-loading'

type Props = {
	height: string
}

const Loading = ({ height }: Props ) =>  (
		<div style={{height}} className=" w-full h-full flex justify-center items-center bg-slate-200">
			<ReactLoading type="spin" color="green" />
		</div>
)

export default Loading