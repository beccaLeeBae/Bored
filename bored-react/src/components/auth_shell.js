import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Form from "./form";
import Search from "./search";
import Results from "./results";
import Account from "./account";
import axios from "axios";
import Cookies from "../helpers/cookies";
import "../App.css";

class AuthShell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			mode: "loading",
			url: "http://localhost:3000"
		};
		this.setUser = this.setUser.bind(this);
	}

	componentDidMount() {
		this.initUser();
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
			this.setState({ mode: "auth" });
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
	}

	renderView() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<Form user={this.state.user} setUser={this.setUser} logoutUser={this.logoutUser} url={this.state.url}/>
					)}
				/>
				<Route
					path="/search"
					render={props => (
						<Search user={this.state.user} logoutUser={this.logoutUser} />
					)}
				/>
				<Route
					path="/results"
					render={props => (
						<Results user={this.state.user} logoutUser={this.logoutUser} />
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