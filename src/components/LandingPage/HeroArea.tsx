import React from "react";

import appStoreLogo from "../../image/LP_appStore_logo.jpeg";
import googlePlayLogo from "../../image/LP_googlePlay_logo.jpeg";


function HeroArea(){
	return(
		<main className="outer hero">
			<h1 className="hero_title">Managing money<br /> as simple as possible</h1>
			<div className="hero_sub">
				<p className="hero_sub_text">
					Get insights on your spending, set goals, and increase your savings.
				</p>
				<div className="hero_sub_app-download">
					<img className="hero_sub_app-download_logo" src={appStoreLogo} alt="App Store logo" />
					<img className="hero_sub_app-download_logo" src={googlePlayLogo} alt="google play logo" />
				</div>
			</div>
		</main>
	)
}

export default HeroArea