import React from "react";

import Header from "./Header";
import HeroArea from "./HeroArea";
import SlideShow from "./SlideShow";

function LandingPage(){
	return(
		<div className="landing-page">
			<Header />
			<HeroArea />
			<SlideShow />
		</div>
	)
}

export default LandingPage