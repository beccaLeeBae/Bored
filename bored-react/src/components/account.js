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

getSavedIn(){
	console.log("Fetching all saved tv shows");
	// get all saved entries for tv shows
}

getSavedOut(){
	console.log("Fetching all saved movies seen");
	// get all saved entries for movies seen
}

upSavedIn(){
	console.log("Upvoting tv show");
	// thumbs up for tv shows saved
}

downSavedIn(){
	console.log("Downvoting tv show");
	// thumbs down for tv shows saved
}

upSavedOut(){
	console.log("Upvoting movie");
	// thumbs up for movies saved
}

downSavedOut(){
	console.log("Downvoting movie");
	// thumbs down for movies saved
	// inline styling for opacity for downvoted movies
}

render(){
	return(
			<div className="account-content">
				<div className="account-header">
				<Nav logoutUser={this.props.logoutUser} />
				</div>
				<div className="account-body">
				<p className="account-text">Other times you were bored</p>
				<div className="search-body">
					<div className="search-body-buttons">
						<div className="couch-account-button" onClick={this.getSavedIn}>
							<img src={Couch} alt="Couch" />
						</div>
						<p className="account-sub-text">x/x times</p>
					</div>
					<div className="search-body-buttons">
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