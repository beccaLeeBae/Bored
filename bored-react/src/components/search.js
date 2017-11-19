import React, { Component } from "react";
import Nav from "./nav";
import Couch from "../images/couch.png";
import Car from "../images/car.png";
import "../App.css";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchType: "new",
			zip: ""
		};
		this.searchOut = this.searchOut.bind(this);
	}

	newSearch() {
		this.setState({ searchType: "new" });
	}

	searchOut() {
		this.setState({ searchType: "searchOut" });
	}

	changeZip(e, input) {
		const zip = e.target.value;
		this.setState({ zip: zip });
	}

	render() {
		return (
			<div className="search-content">
				{this.state.searchType === "new" && (
					<div className="search-header">
						<p className="search-text">How bored are you?</p>
						<Nav logoutUser={this.props.logoutUser} user={this.props.user} />
					</div>
				)}
				{this.state.searchType === "searchOut" && (
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
				)}

				{this.state.searchType === "new" && (
					<div className="search-body">
						<div className="search-body-buttons">
							<div className="couch-button" onClick={this.props.getShows}>
								<img src={Couch} alt="Couch" />
							</div>
							<p>I'm parked on the couch</p>
						</div>
						<div className="search-body-buttons" onClick={this.searchOut}>
							<div className="car-button">
								<img src={Car} alt="Car" />
							</div>
							<p>I need to leave the house</p>
						</div>
					</div>
				)}
				{this.state.searchType === "searchOut" && (
					<div className="search-out-body">
						<p className="search-res-text">Where are you?</p>
						<form onSubmit={e => this.props.passZip(e, this.state.zip)}>
							<input
								type="text"
								placeholder="i.e. 11237"
								value={this.state.zip}
								onChange={e => this.changeZip(e, "zip")}
							/>
							<input type="submit" value="Search" />
						</form>
					</div>
				)}
			</div>
		);
	}
}

export default Search;