import React, { Component } from "react";
import Nav from "./nav";
import axios from "axios";
import "../App.css";
require("date-format-lite");

class StayingIn extends Component {
	constructor() {
		super();
		this.state = {
			openModal: false,
			title: "",
			overview: "",
			saved: false
		};
	}

	toggleModal(show) {
		this.setState(prev => {
			return {
				openModal: !prev.openModal,
				overview: prev.overview === "" ? show.overview : "",
				title: prev.title === "" ? show.name : "",
				saved: false
			};
		});
	}

	getShows() {
		return this.props.tvData.map(show => {
			return (
				<div className="results-each" key={show.id}>
					<img
						src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
						alt="Show Poster"
					/>
					<p className="show-name">{show.name}</p>
					<p className="show-rating">Rating: {show.vote_average}/10</p>
					<button onClick={e => this.onClick(e, show)}>More</button>
				</div>
			);
		});
	}

	onClick(e, show) {
		e.preventDefault();
		console.log("clicked button");
		this.props.showNextEpisode(show.name, this.toggleModal.bind(this, show));
	}

	saveOnClick(e) {
		e.preventDefault();
		console.log(this.props.url);
		const medium = "tv";
		axios
			.post(`${this.props.url}/save`, {
				medium: medium,
				title: this.state.title,
				user_id: this.props.user.id
			})
			.then(res => {
				console.log("Saved tv show!");
				this.setState({ saved: true });
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
								<p className="results-location">& staying on the couch</p>
							</div>
							<Nav user={this.props.user} logoutUser={this.props.logoutUser} />
						</div>
						<div className="results-gallery">{this.getShows()}</div>
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
									{this.state.saved === false && (									
										<div className="modal-content">
										<p className="show-title">{this.state.title}</p>
										<p>{this.state.overview}</p>
										<p className="episode-day-time">
											{this.props.episodeData[0].show.schedule.days.toString()}{" "}
											at{" "}
											{this.props.episodeData[0].show.schedule.time.date(
												"H:mm A"
											)}
										</p>
										<p className="episode-network">
											{this.props.episodeData[0].show.network.name}
										</p>
										<button onClick={e => this.saveOnClick(e)}>
											I'll watch this
										</button>
									</div>
									)}
									{this.state.saved === true && (
										<div className="modal-content">
										<p className="confirm-text">Make an evening of it.</p>
										<a href="http://seamless.com"><button>Seamless</button></a>
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

export default StayingIn;