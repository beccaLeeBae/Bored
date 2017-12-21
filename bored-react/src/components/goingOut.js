import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";
import axios from "axios";
require("date-format-lite");

class GoingOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			description: "",
			modalFood: false,
			title: "",
			showtimes: []
		};
	}

	toggleModal(event, description, showtimes, title) {
		event.preventDefault();
		this.setState(prev => {
			prev.openModal = prev.openModal === false ? true : false;
			return prev;
		});
		this.setState({
			description: description,
			showtimes: showtimes,
			title: title
		});
	}

	toggleFood(event) {
		this.setState(prev => {
			prev.modalFood = prev.modalFood === false ? true : false;
			return prev;
		});
	}

	getMovies() {
		return this.props.movieData.map(movie => {
			return (
				<div className="movie-results-each" key={movie.tmsId}>
					<p className="results-title">{movie.title}</p>
					{movie.genres && (<p className="results-genre">{movie.genres[0]}</p>)}
					<button
						onClick={e =>
							this.toggleModal(
								e,
								movie.shortDescription,
								movie.showtimes,
								movie.title
							)}
					>
						More
					</button>
				</div>
			);
		});
	}

	getShowtimes() {
		return this.state.showtimes.map(showing => {
			const s = showing.dateTime.date("H:mm A");
			return (
				<div key={Math.random()} className="modal-showtimes-each">
					<p className="theatre-name">{showing.theatre.name}</p>
					<p className="showtime">{s}</p>
					{showing.ticketURI && <a href={showing.ticketURI} rel="noopener noreferrer" target='_blank'>Get Tickets</a>}
				</div>
			);
		});
	}
	getFood() {
		return this.props.foodOptions.map(option => {
			console.log(option.venue);
			return (
				<div
					key={option.venue.id}
					className="modal-food-each"
				>
					<p className="theatre-name">{option.venue.name}</p>
					<p className="venue-category">{option.venue.categories[0].name}</p>
					<p>{option.venue.location.formattedAddress[0]}</p>
					<p>{option.venue.location.formattedAddress[1]}</p>
					{option.venue.url && <a href={option.venue.url} rel="noopener noreferrer" target='_blank'>More</a>}
				</div>
			);
		});
	}

	saveOnClick() {
		// e.preventDefault();
		console.log(this.props.url);
		const medium = "movie";
		axios
			.post(`${this.props.url}/save`, {
				medium: medium,
				title: this.state.title,
				user_id: this.props.user.id
			})
			.then(res => {
				// console.log("SAVED", this.state.title);
				// this.props.history.push(`/account`);
				this.setState({ openModal: false });
			})
			.catch(err => {
				console.log("Error saving tv show");
			});
	}

	render() {
		return (
			<div>
				{this.state.openModal === false && (
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
				{this.state.openModal === true && (
					<div className="results-content">
						<div className="modal">
							<div className="show-more-modal">
								<span
									className="close-modal"
									onClick={this.toggleModal.bind(this)}
								>
									&times;
								</span>
								{this.state.modalFood === false && (
									<div className="modal-content">
										<p className="show-title">{this.state.title}</p>
										{this.state.description && <p>{this.state.description}</p>}
										<div className="modal-buttons">
											<button onClick={this.saveOnClick.bind(this)}>I'll watch this</button>
											<button onClick={this.toggleFood.bind(this)}>
												Find food nearby
											</button>
										</div>
										<div className="modal-showtimes">{this.getShowtimes()}</div>
									</div>
								)}
								{this.state.modalFood === true && (
									<div className="modal-content">
										<p className="show-title">{this.state.title}</p>
										{this.state.description && <p>{this.state.description}</p>}
										<div className="modal-buttons">
											<button onClick={this.saveOnClick.bind(this)}>
												I'll watch this
											</button>
											<button onClick={this.toggleFood.bind(this)}>
												Back to showtimes
											</button>
										</div>
										<div className="modal-showtimes">{this.getFood()}</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default GoingOut;