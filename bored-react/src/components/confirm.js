import React, { Component } from "react";
import Nav from "./nav";
import { Link } from "react-router-dom";
import "../App.css";

class Confirm extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		console.log(this.props.weatherData);
	}

	newSearch() {
		// this.props.history.push(`/search`);
	}
	render() {
		const temp = Math.ceil(this.props.weatherData.main.temp);
		const city = this.props.weatherData.name;
		const description = this.props.weatherData.weather[0].description;

		return (
			<div className="search-content">
				<div className="search-header">
					<div className="results-text-content">
						<p className="results-logo">Bored</p>
						<p className="results-location">& leaving the house</p>
					</div>
					<Nav
						user={this.props.user}
						logoutUser={this.props.logoutUser}
						newSearch={this.newSearch.bind(this)}
					/>
				</div>
				<div className="search-out-body">
					<p className="confirm-text">
						It's {temp}&deg;F in {city} with {description}. Are you sure you
						want to leave the house today?
					</p>
					<button onClick={() => {this.props.getMovies(this.props.zip)}}>Yes, I'm sure</button>
					<Link to="/search"><button>I'll stay in</button></Link>
				</div>
			</div>
		);
	}
}

export default Confirm;