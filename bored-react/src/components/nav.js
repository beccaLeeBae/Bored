import React, { Component } from "react";
import SearchButton from "../images/search-icon.png";
import AccountButton from "../images/history-icon.png";
import LogoutButton from "../images/logout-icon.png";
import "../App.css";

class Nav extends Component {
		constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}
	render() {
		return (
				<div className="nav-content">
				<div className="user-menu">
					<p className="user-initial">B</p>
				</div>
				{this.state.open === true && (
				<div>
				<div className="menu-button">
				<img src={SearchButton} alt="Search"/>
				</div>
				<div className="menu-button">
				<img src={AccountButton} alt="Account"/>
				</div>
				<div className="menu-button">
				<img src={LogoutButton} alt="Logout"/>
				</div>
				</div>
				)}
				</div>
		);
	}
}

export default Nav;