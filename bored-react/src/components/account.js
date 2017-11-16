import React, { Component } from 'react';
import Nav from './nav';
import Couch from "../images/couch-account.png";
import Car from "../images/car-account.png";
import '../App.css';

class Account extends Component {
render(){
	return(
			<div className="account-content">
				<div className="account-header">
				<Nav />
				</div>
				<div className="account-body">
				<p className="account-text">Other times you were bored</p>
				<div className="search-body">
					<div className="search-body-buttons">
						<div className="couch-account-button">
							<img src={Couch} alt="Couch" />
						</div>
						<p className="account-sub-text">x/x times</p>
					</div>
					<div className="search-body-buttons">
						<div className="car-account-button">
							<img src={Car} alt="Car" />
						</div>
						<p className="account-sub-text">x/x times</p>
					</div>
				</div>
				</div>

			</div>
		)
}
}

export default Account;