import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";

class GoingOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			dummyMovie:
				"https://i.pinimg.com/736x/40/13/54/40135456fa61e13eddc37bcfa6e9f905--minimalist-movie-posters-minimalist-art.jpg"
		};
	}

	toggleModal(event, description) {
		event.preventDefault();
		console.log(description);
		this.setState(prev => {
			prev.show = prev.show === false ? true : false;
			return prev;
		});
	}

	getMovies() {
		return this.props.movieData.map(movie => {
			return (
				<div className="results-each" key={movie.tmsId}>
					<img src={this.state.dummyMovie} alt="Movie Poster" />
					<p className="results-title">{movie.title}</p>
					<p>{movie.genres}</p>
					<p>{movie.showtimes[0].theatre.name}</p>
					<button onClick= {e => this.toggleModal(e, movie.shortDescription)}>More</button>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.state.show === false && (
					<div className="results-content">
						<div className="search-header">
							<div className="results-text-content">
								<p className="results-logo">Bored</p>
								<p className="results-location">& leaving the house</p>
							</div>
							<Nav user={this.props.user} logoutUser={this.props.logoutUser} />
						</div>
						<div className="results-gallery">{this.getMovies()}</div>
					</div>
				)}
				{this.state.show === true && (
					<div className="results-content">
						<div className="modal">
							<div className="show-more-modal">
								<span
									className="close-modal"
									onClick={this.toggleModal.bind(this)}
								>
									&times;
								</span>
								<p>Show Overview</p>
								<button>I'll watch this</button>
								<button>Find food nearby</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default GoingOut;