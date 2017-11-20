import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";
require("date-format-lite");

class GoingOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			description: '',
			title: '',
			showtimes: [],
			dummyMovie:
				"https://i.pinimg.com/736x/40/13/54/40135456fa61e13eddc37bcfa6e9f905--minimalist-movie-posters-minimalist-art.jpg"
		};
	}

	toggleModal(event, description, showtimes) {
		event.preventDefault();
		this.setState(prev => {
			prev.show = prev.show === false ? true : false;
			return prev;
		});
		this.setState({ description: description, showtimes: showtimes });
	}

	getMovies() {
		return this.props.movieData.map(movie => {
			return (
				<div className="results-each" key={movie.tmsId}>
					<img src={this.state.dummyMovie} alt="Movie Poster" />
					<p className="results-title">{movie.title}</p>
					<p>{movie.genres}</p>
					<p>{movie.showtimes[0].theatre.name}</p>
					<button onClick= {e => this.toggleModal(e, movie.shortDescription, movie.showtimes)}>More</button>
				</div>
			);
		});
	}

	getShowtimes() {
		return this.state.showtimes.map(showing => {
			const s = ((showing.dateTime).date("H:mm A"));
			return (
				<div key={Math.random()} className="modal-showtimes-each">
				<p className="theatre-name">{showing.theatre.name}</p>
				<p className="showtime">{s}</p>
				{showing.ticketURI && (<a href={showing.ticketURI}>Get Tickets</a>)}
				</div>
				)
		})
	}

	// getFood() {
	// 	return this.props.foodOptions.forEach(option => {
	// 		return (
	// 			<div key={option.id}>
	// 			<p>{option.venue.name}</p>
	// 			<p>{option.venue.location}</p>
	// 			<p></p>
	// 			</div>
	// 			)
	// 	})
	// }

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
								<div className="modal-content">
								
								{this.state.description && (<p>{this.state.description}</p>)}
								<div className="modal-showtimes">
								<p>{this.state.title}</p>
								{this.getShowtimes()}
								</div>
								<button>I'll watch this</button>
								<button>Find food nearby</button>
							</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default GoingOut;