import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import Index from './index';
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
			meal: '',
			url: "http://localhost:3000",
			movieData: [],
			tvData: [],
			episodeData: [],
			foodOptions: []
		};
		this.setUser = this.setUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
		this.requireUser = this.requireUser.bind(this);
		this.passZip = this.passZip.bind(this);
		this.getMovies = this.getMovies.bind(this);
		this.getShows = this.getShows.bind(this);
		this.showNextEpisode = this.showNextEpisode.bind(this);
	}

	componentDidMount() {
		this.initUser();
		this.getDate();
	}

	getDate() {
		const d = new Date();
		const newDate = d.format("YYYY-MM-DD");
		this.setState({ date: newDate });
		const mealTime = d.format("hh");
		if (mealTime >= '06' && mealTime <= '11') {
			this.setState({ meal: "breakfast" });
		} else if (mealTime >= '12' && mealTime <= '4') {
			this.setState({ meal: "lunch" });
		} else if (mealTime >= '4:30' && mealTime <= '9') {
			this.setState({ meal: "dinner" });
		} else {
			this.setState({ meal: "snack" });
		}
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
		console.log(`${this.state.user.name} is logged in.`);
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
		this.getWeather(zip);
	}

	getWeather(zip) {
		axios
			.get(`${this.state.url}/weather/${zip}`)
			.then(res => {
				if ((res.data.main.temp) > 32) {
					this.setState({ zip: zip });
					this.getMovies(zip);
				} else if ((res.data.main.temp) > 90) {
					this.setState({ weatherData: res.data, zip: zip});
					this.props.history.push(`/confirm`);
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
		axios
			.get(`${this.state.url}/movies/${zip}/${this.state.date}`)
			.then(res => {
				console.log("Successful fetching of movieData", res.data);
				this.setState({ movieData: res.data });
				this.getFood(zip, this.state.meal);
				this.props.history.push(`/results/out`);
			})
			.catch(err => {
				console.log("Error fetching movie data");
			});
	}

	getFood(zip, meal) {
		axios.get(`${this.state.url}/food/${zip}/${this.state.meal}`)
		.then(res => {
			this.setState({ foodOptions: res.data.response.groups[0].items });
			console.log(res.data.response.groups[0].items);
		}).catch(err => {
			console.log("Error fetching restaurants");
		})
	}

	getShows(e) {
		e.preventDefault();
		axios.get(`${this.state.url}/tv`).then(res => {
			this.setState({ tvData: res.data.results });
			console.log("Sucessful fetching of tvData", res.data);
			this.props.history.push(`/results/in`);
		});
	}

	showNextEpisode(title, callback) {
		axios.get(`${this.state.url}/next/${title}`)
		.then(res => {
			this.setState({ episodeData: res.data });
			console.log("Episode Data", this.state.episodeData);
			if (callback) { callback() } ;
		}).catch(err => {
			console.log("Error fetching next showing")
		})
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
								getShows={this.getShows}
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
								url={this.state.url}
								foodOptions={this.state.foodOptions}
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
								url={this.state.url}
								episodeData={this.state.episodeData}
								tvData={this.state.tvData}
								showNextEpisode={this.showNextEpisode}
							/>
						)}
				/>
				<Route
					path="/account"
					render={props =>
						this.requireUser(
							<Account user={this.state.user} url={this.state.url} logoutUser={this.logoutUser} />
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