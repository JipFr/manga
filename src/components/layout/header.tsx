// React imports
import React, { FunctionComponent } from "react";

/** Header component. used in Core component at the top */
const Header: FunctionComponent = (_props) => {
	return (
		<header>
			<img className="logo" src="https://via.placeholder.com/300x150.png/09f/fff?text=LOGO" alt="Logo" />
		</header>
	)
}

export default Header;