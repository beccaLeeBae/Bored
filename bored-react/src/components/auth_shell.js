import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Form from "./form";
import Search from "./search";
import Results from "./results";
import Account from "./account";
import axios from "axios";
import Cookies from "../helpers/cookies";
import "../App.css";
require("date-format-lite");

class AuthShell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			date: "",
			zipCode: '',
			url: "http://localhost:3000",
			movieData: [],
			tvData: []
		};
		this.setUser = this.setUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
		this.requireUser = this.requireUser.bind(this);
		this.passZip = this.passZip.bind(this);
		this.getMovies = this.getMovies.bind(this);
		this.getShows = this.getShows.bind(this);
	}

	componentDidMount() {
		this.initUser();
		this.getDate();
	}

	getDate() {
		const d = new Date();
		const newDate = d.format("YYYY-MM-DD");
		this.setState({ date: newDate });
		console.log("Today's date is", newDate);
	}

	initUser() {
		const token = Cookies.get("token");
		if (token && token !== "") {
			axios
				.get(`${this.state.url}/users/validate`, {
					params: { auth_token: token }
				})
				.then(res => {
					this.setState({ user: res.data });
				})
				.catch(err => {
					Cookies.set("token", "");
					this.setState({ user: false });
				});
		} else {
			this.setState({ user: false });
		}
	}

	setUser(user) {
		Cookies.set("token", user.token);
		this.setState({ user: user }, () => {
			this.props.history.push(`/search`);
		});
		console.log("Logged in");
	}

	logoutUser() {
		Cookies.set("token", "");
		this.setState({ user: false });
		this.props.history.push(`/`);
		console.log("Logging out");
	}

	requireUser(render) {
		return this.state.user ? render : <Redirect to="/" />;
	}

	passZip(zip){
		console.log("Zipcode in parent comp", zip);
		this.setState({ zipCode: zip });
		this.getMovies();
	}

	getMovies() {
		// get all movies with time and zip code
		// axios
		// 	.get(`${this.state.url}/movies/${this.state.zipCode}/${this.state.date}`)
		// 	.then(res => {
		// 		console.log("Successful fetching of movieData", res.data);
		// 		this.setState({ movieData: res.data });
		// 		this.props.history.push(`/results`);
		// 	})
		// 	.catch(err => {
		// 		console.log("Error fetching movie data");
		// 	});

		console.log("Inside getMovies, the zip here is ", this.state.zipCode);
	}

	getShows(event) {
		event.preventDefault();
		axios.get(`${this.state.url}/tv`).then(res => {
			this.setState({ tvData: res.data.results });
			console.log("Sucessful fetching of tvData", res.data);
			this.props.history.push(`/results`);
		});
	}

	renderView() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<Form
							user={this.state.user}
							setUser={this.setUser}
							logoutUser={this.logoutUser}
							url={this.state.url}
						/>
					)}
				/>
				<Route
					path="/search"
					render={props =>
						this.requireUser(
							<Search
								user={this.state.user}
								logoutUser={this.logoutUser}
								url={this.state.url}
								passZip={this.passZip}
								getMovies={this.getMovies}
								getShows={this.getShows}
							/>
						)}
				/>
				<Route
					path="/results"
					render={props => (
						<Results
							user={this.state.user}
							logoutUser={this.logoutUser}
							tvData={this.state.tvData}
							movieData={this.state.movieData}
						/>
					)}
				/>
				<Route
					path="/account"
					render={props => (
						<Account user={this.state.user} logoutUser={this.logoutUser} />
					)}
				/>
			</Switch>
		);
	}

	render() {
		return <div>{this.renderView()}</div>;
	}
}

export default AuthShell;