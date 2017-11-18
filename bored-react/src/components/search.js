import React, { Component } from "react";
import axios from 'axios';
import Nav from "./nav";
import Couch from "../images/couch.png";
import Car from "../images/car.png";
import Results from "./results";
import "../App.css";
require ('date-format-lite');

class Search extends Component {
	constructor() {
		super();
		this.state = {
			searchType: "new",
			zip: '',
			date: '',
			movieData: [],
			tvData: []
		};
		this.getDate = this.getDate.bind(this);
		// this.getMovies = this.getMovies.bind(this);
	}

	componentDidMount(){
		this.getDate();
		console.log(this.state.movieData);
	}

	getDate() {
		const d = new Date();
		console.log("The original format ", d);
		const newDate = d.format("YYYY-MM-DD");
		this.setState({ date: newDate });
	}

	newSearch() {
		this.setState({ searchType: "new" });
	}

	searchIn() {
		this.setState({ searchType: "searchIn" });
		console.log("Showing search results for option one");
		this.getTv();
	}

	searchOut() {
		this.setState({ searchType: "searchOut" });
		console.log("Showing search results for option one");
	}

	getZip(e, input) {
		const zip = e.target.value;
		this.setState({ zip: zip });
		console.log("Zipcode is ", this.state.zip);
		console.log("Time of search is ", this.state.date);
	}

	// getMovies(event){
	// // get all movies with time and zip code
	// 	event.preventDefault();
	// 	axios.get(`${this.props.url}/movies/${this.state.zip}/${this.state.date}`).then(res => {
	// 		console.log(res.data);
	// 		this.setState({ movieData: res.data });
	// 		this.props.history.push(`/results`);
	// 	}).catch(err => {
	// 		console.log("Error fetching movie data");
	// 	})
	// }

	// getTv(){
	// 	get all tv shows with time
	// 	axios(`${this.props.url}/tv`).then(res => {
	// 		this.setState({ tvData: response.data.tv });
	// 		this.props.history.push(`/results`);
	// 	}).catch(err => {
	// 		console.log("Error fetching TV data");
	// 	})
	// }

	render() {
		return (
			<div className="search-content">
			{this.state.searchType === "new" && (
				<div className="search-header">
				<p className="search-text">How bored are you?</p>
				<Nav logoutUser={this.props.logoutUser} />
				</div>
				)}
			{this.state.searchType === "searchOut" && (
				<div className="search-header">
				<div className="results-text-content">
				<p className="results-logo">Bored</p>
				<p className="results-location">& leaving the house</p>
				</div>
				<Nav logoutUser={this.props.logoutUser} newSearch={this.newSearch.bind(this)}/>
				</div>
				)}

			{this.state.searchType === "new" && (
						<div className="search-body">
						<div className="search-body-buttons">
							<div className="couch-button" onClick={this.props.getShows}>
								<img src={Couch} alt="Couch"/>
							</div>
							<p>I'm parked on the couch</p>
						</div>
						<div className="search-body-buttons" onClick={this.props.getMovies}>
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
				<form onSubmit={this.getMovies}>
				<input type="text" placeholder="i.e. 11237" value={this.state.zip} onChange={e => this.getZip(e, "zip")}/>
				<input type="submit" value="Search"/>
				</form>
				</div>
				)}
			</div>
		);
	}
}

export default Search;