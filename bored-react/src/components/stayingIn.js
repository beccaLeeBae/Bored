import React, { Component } from "react";
import Nav from "./nav";
import "../App.css";

class StayingIn extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
			title: "",
			overview: ""
		};
	}

	getShows() {
		return this.props.tvData.map(show => {
			return (
				<div className="results-each" key={show.id}>
					<img
						src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
						alt="Show Poster"
					/>
					<p className="results-title">{show.name}</p>
					<p>Rating: {show.vote_average}</p>
					<button onClick={e => this.toggleModal(e, show)}>More</button>
				</div>
			);
		});
	}

	toggleModal(event, show) {
		event.preventDefault();
		this.setState(prev => {
			prev.show = prev.show === false ? true : false;
			return prev;
		});
		this.setState(prev => {
			prev.overview = prev.overview === "" ? show.overview : "";
			return prev;
		});
		this.setState(prev => {
			prev.title = prev.title === "" ? show.name : "";
			return prev;
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
								<p className="results-location">& staying on the couch</p>
							</div>
							<Nav user={this.props.user} logoutUser={this.props.logoutUser} />
						</div>
						<div className="results-gallery">{this.getShows()}</div>
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
									<p className="show-title">{this.state.title}</p>
									<p>{this.state.overview}</p>
										<button>
											I'll watch this
										</button>
										<a href="https://www.seamless.com/">
											<button>Seamless</button>
										</a>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default StayingIn;