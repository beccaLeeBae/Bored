import React, { Component } from 'react';
import Nav from './nav';
import Couch from "../images/couch-account.png";
import Car from "../images/car-account.png";
import '../App.css';

class Account extends Component {

componentDidMount(){
	console.log("Calculating all saved entries");
	// get number of all saved entries
	// render the total from out or in vs. total
}

render(){
	return(
			<div className="account-content">
				<div className="account-header">
				<Nav user={this.props.user} logoutUser={this.props.logoutUser} />
				</div>
				<div className="account-body">
				<p className="account-text">Other times you were bored</p>
				<div className="search-body">
					<div className="account-body-buttons">
						<div className="couch-account-button" onClick={this.getSavedIn}>
							<img src={Couch} alt="Couch" />
						</div>
						<p className="account-sub-text">x/x times</p>
					</div>
					<div className="account-body-buttons">
						<div className="car-account-button" onClick={this.getSavedOut}>
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