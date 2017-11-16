import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/auth_shell";
import "./App.css";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/" render={props => <Auth {...props} />} />
			</BrowserRouter>
		);
	}
}

export default App;