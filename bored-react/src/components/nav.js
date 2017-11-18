import React, { Component } from "react";
import SearchButton from "../images/search-icon.png";
import AccountButton from "../images/history-icon.png";
import LogoutButton from "../images/logout-icon.png";
import { Link } from "react-router-dom";
import "../App.css";

class Nav extends Component {
		constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}

	toggleMenu(event){
		event.preventDefault();
		this.setState(prev => {
			prev.open = prev.open === false ? true : false;
			return prev;
		})
	}

	render() {
		return (
				<div className="nav-content">
				<div className="user-menu" onClick={this.toggleMenu.bind(this)}>
					<p className="user-initial">B</p>
				</div>
				{this.state.open === true && (
				<div className="open-menu">
				
				<Link to="/search">
				<div className="menu-button" onClick={this.props.newSearch}>
				<img src={SearchButton} alt="Search"/>
				</div>
				</Link>
				<Link to="/account">
				<div className="menu-button">
				<img src={AccountButton} alt="Account"/>
				</div>
				</Link>
				<div className="menu-button" onClick={this.props.logoutUser}>
				<img src={LogoutButton} alt="Logout"/>
				</div>
				</div>
				)}
				</div>
		);
	}
}

export default Nav;