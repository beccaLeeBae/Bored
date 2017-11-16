import React, { Component } from "react";
import Nav from './nav';
import Couch from "../images/couch.png";
import Car from "../images/car.png";
import "../App.css";

class Search extends Component {
	render() {
		return (
			<div className="search-content">
				<div className="search-header">
					<p className="search-text">How bored are you?</p>
					<Nav/>
				</div>
				<div className="search-body">
					<div className="search-body-buttons">
						<div className="couch-button">
							<img src={Couch} alt="Couch" />
						</div>
						<p>I'm parked on the couch</p>
					</div>
					<div className="search-body-buttons">
						<div className="car-button">
							<img src={Car} alt="Car" />
						</div>
						<p>I need to leave the house</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Search;