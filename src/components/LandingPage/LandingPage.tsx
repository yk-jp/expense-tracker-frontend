import React from "react";

import Header from "./Header";
import HeroArea from "./HeroArea";
import SlideShow from "./SlideShow";
import Modal from "./Modal";


function LandingPage(){
	return(
		<div className="landing-page">
			{/* <Header />
			<HeroArea />
			<SlideShow /> */}
			<Modal />
		</div>
	)
}

export default LandingPage