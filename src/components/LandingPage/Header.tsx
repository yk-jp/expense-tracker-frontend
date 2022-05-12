import React from "react";
import logo from "../../image/logo.png";

function Header(){
	return (
		<header className="outer header">
			<img className="header_logo" src={logo} />
			<nav className="header_nav">
				<ul className="header_nav_list">
					<li className="header_nav_list_item">Sign up</li>
					<li className="header_nav_list_item">log in</li>
					<li className="header_nav_list_menu"></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header