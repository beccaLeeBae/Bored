import React, { Component } from 'react';
import Nav from './nav';
import Couch from "../images/couch-account.png";
import Car from "../images/car-account.png";
import axios from 'axios';
import '../App.css';

class Account extends Component {
	constructor(){
		super();
		this.state = {
			total: 0,
			movies: 0,
			tv: 0
		}
	}
	componentDidMount() {
		const medium = "movie";
		axios
			.get(`${this.props.url}/saved/${this.props.user.id}/${medium}`)
			.then(res => {
				this.setState({ movies: res.data.movie_length, tv: res.data.tv_length, total: res.data.total_times });
				console.log(this.state);
			})
			.catch(err => {
				console.log("Error");
			});
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
						<p className="account-sub-text">{this.state.tv}/{this.state.total} times</p>
					</div>
					<div className="account-body-buttons">
						<div className="car-account-button" onClick={this.getSavedOut}>
							<img src={Car} alt="Car" />
						</div>
						<p className="account-sub-text">{this.state.movies}/{this.state.total} times</p>
					</div>
				</div>
				</div>

			</div>
		)
}
}

export default Account;