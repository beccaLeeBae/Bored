import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";
require ('date-format-lite');

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resultType: "out",
			dummyTv:
				"http://trendland.com/wp-content/uploads/2009/11/minimalist-poster-popular-tv-shows.jpg",
			dummyMovie:
				"https://i.pinimg.com/736x/40/13/54/40135456fa61e13eddc37bcfa6e9f905--minimalist-movie-posters-minimalist-art.jpg"
		};
		this.getMovies = this.getMovies.bind(this);
	}

	getMovies() {
		return this.props.movieData.map(movie => {
			return (
				<div className="results-each" key={movie.rootId} onClick={this.saveMovie}>
					<p>{movie.title}</p>
					<img src={movie.preferredImage.uri} alt="Movie Poster" />
					<p>{movie.genres[0]}</p>
					<p>{movie.showtimes[0].theatre.name}</p>
					<p>{movie.showtimes[0].dateTime}</p>
				</div>
			);
		});
	}

	saveMovie() {
		// save chosen movie to db
		// redirect to link to purchase tickets (if available) and then account page
	}

	saveTv() {
		// save chosen tv show to db
		// redirect to account page
	}

	render() {
		return (
			<div className="results-content">
				<div className="search-header">
					<div className="results-text-content">
						<p className="results-logo">Bored</p>
						{this.state.resultType === "out" && (
							<p className="results-location">& leaving the house</p>
						)}
						{this.state.resultType === "in" && (
							<p className="results-location">& staying on the couch</p>
						)}
					</div>
					<Nav logoutUser={this.props.logoutUser} />
				</div>
				{this.state.resultType === "out" && (
					<div className="results-gallery">{this.getMovies()}</div>
				)}

				{this.state.resultType === "in" && (
					<div className="results-gallery">
						<div className="results-each" onClick={this.saveTv}>
							<p>Program: Title</p>
							<img src={this.state.dummyTv} alt="TV Poster" />
							<p>Program: Genre(s)</p>
							<p>Station - callSign (Name)</p>
							<p>startTime - duration (hours)</p>
						</div>

						<div className="results-each" onClick={this.saveTv}>
							<p>Program: Title</p>
							<img src={this.state.dummyTv} alt="TV Poster" />
							<p>Program: Genre(s)</p>
							<p>Station - callSign (Name)</p>
							<p>startTime - duration (hours)</p>
						</div>

						<div className="results-each" onClick={this.saveTv}>
							<p>Program: Title</p>
							<img src={this.state.dummyTv} alt="TV Poster" />
							<p>Program: Genre(s)</p>
							<p>Station - callSign (Name)</p>
							<p>startTime - duration (hours)</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Results;