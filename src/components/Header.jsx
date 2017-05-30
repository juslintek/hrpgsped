import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MainMenu from './Pages/MainMenu';

export default class Header extends Component{
	render() {
		return(
			<header className="header">
				<div className="alignLeft">
					<div className="logo">
						<Link to="/">Logo</Link>
					</div>
				</div>
				<div className="alignRight">
					<div className="menu">
              			<MainMenu/>
					</div>
				</div>
			</header>
		)
	}
}