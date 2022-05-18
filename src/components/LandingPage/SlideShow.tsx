import React from "react";
import picture1 from "../../image/dammy.jpeg"
import picture2 from "../../image/dammy1.jpeg"
import picture3 from "../../image/dammy2.jpeg"

function SlideShow(){

	let imagesObject = [
		<img className="slide-show_pic" src={picture1} />, 
		<img className="slide-show_pic" src={picture2} />, 
		<img className="slide-show_pic" src={picture3} />
	]



	return(
		<div className="slide-show">
			<div className="slide-show_primary slide-show_section">
				{imagesObject}
			</div>
			<div className="slide-show_support slide-show_section">
				{imagesObject}
			</div>
		</div>
	)
}

export default SlideShow