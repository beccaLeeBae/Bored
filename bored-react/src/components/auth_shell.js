import React, { Component } from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
// import Index from "./components/index";
import Form from "./components/form";
import Home from "./components/home";
import axios from "axios";
import Cookies from "../helpers/Cookies";
import "./App.css";

class AuthShell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			mode: "loading",
			url: "http://localhost:3000"
		};
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
					this.setState({ user: res.data, mode: "content" });
				})
				.catch(err => {
					Cookies.set("token", "");
					this.setState({ user: false, mode: "auth" });
				});
		} else {
			this.setState({ mode: "auth" });
		}
	}

	setUser(user) {
		Cookies.set("token", user.token);
		this.setState({ user: user, mode: "content" });
	}

	logoutUser() {
		Cookies.set("token", "");
		this.setState({ user: false, mode: "auth" });
	}

	renderView() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<Form user={this.state.user} logoutUser={this.logoutUser} />
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

export default App;