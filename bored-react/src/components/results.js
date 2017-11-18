import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";
require ('date-format-lite');

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resultType: "in",
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
				<div className="results-each" key={movie.id} onClick={this.saveMovie}>
					<p>{movie.title}</p>
					<img src={this.state.dummyMovie} alt="Movie Poster"/>
					<p>{movie.overview}</p>
					<p>Rating: {movie.vote_average}/10</p>
				</div>
			);
		});
	}

	getShows() {
			return this.props.tvData.map(show => {
			return (
				<div className="results-each" key={show.id} onClick={this.saveTv}>
					<p>{show.name}</p>
					<img src={this.state.dummyTv} alt="Movie Poster"/>
					<p>{show.overview}</p>
					<p>Rating: {show.vote_average}/10</p>
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
					<div className="results-gallery">{this.getShows()}</div>
				)}
			</div>
		);
	}
}

export default Results;