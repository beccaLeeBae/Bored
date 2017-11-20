import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Form from "./form";
import Search from "./search";
import Confirm from './confirm';
import StayingIn from "./stayingIn";
import GoingOut from "./goingOut";
import Account from "./account";
import NoUser from './noUser';
import axios from "axios";
import Cookies from "../helpers/cookies";
import "../App.css";
require("date-format-lite");

class AuthShell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			zip: '',
			date: "",
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
		return this.state.user ? render : <Redirect to="/404" />;
	}

	passZip(e, zip) {
		e.preventDefault();
		console.log("Zipcode in parent comp", zip);
		this.getWeather(zip);
	}

	getWeather(zip) {
				console.log("The zipcode at getWeather is", zip);
		// get all movies with time and zip code
		axios
			.get(`${this.state.url}/weather/${zip}`)
			.then(res => {
				if ((res.data.main.temp) > 32) {
					this.getMovies(zip);
				}
				else {
					this.setState({ weatherData: res.data, zip: zip});
					this.props.history.push(`/confirm`);
				}
			})
			.catch(err => {
				console.log("Error fetching movie data");
			});
	}

	getMovies(zip) {
		console.log("The zipcode at getMovies is", zip);
		// get all movies with time and zip code
		axios
			.get(`${this.state.url}/movies/${zip}/${this.state.date}`)
			.then(res => {
				console.log("Successful fetching of movieData", res.data);
				this.setState({ movieData: res.data });
				this.props.history.push(`/results/out`);
			})
			.catch(err => {
				console.log("Error fetching movie data");
			});
	}

	getShows(event) {
		event.preventDefault();
		axios.get(`${this.state.url}/tv`).then(res => {
			this.setState({ tvData: res.data.results });
			console.log("Sucessful fetching of tvData", res.data);
			this.props.history.push(`/results/in`);
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
					path="/confirm"
					render={props =>
						this.requireUser(
							<Confirm
								user={this.state.user}
								url={this.state.url}
								logoutUser={this.logoutUser}
								zip={this.state.zip}
								weatherData={this.state.weatherData}
								getMovies={this.getMovies}
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
					path="/results/out"
					render={props =>
						this.requireUser(
							<GoingOut
								user={this.state.user}
								logoutUser={this.logoutUser}
								movieData={this.state.movieData}
							/>
						)}
				/>
				<Route
					path="/results/in"
					render={props =>
						this.requireUser(
							<StayingIn
								user={this.state.user}
								logoutUser={this.logoutUser}
								tvData={this.state.tvData}
							/>
						)}
				/>
				<Route
					path="/account"
					render={props =>
						this.requireUser(
							<Account user={this.state.user} logoutUser={this.logoutUser} />
						)}
				/>
				<Route path="/404" render={props => <NoUser />} />
			</Switch>
		);
	}

	render() {
		return <div>{this.renderView()}</div>;
	}
}

export default AuthShell;