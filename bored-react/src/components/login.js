import React, { Component } from "react";
import "../App.css";

class Login extends Component {
	render() {
		return (
			<div className="form-right">
				<form>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<input type="submit" value="Log In" />
				</form>
				<p>Register</p>
			</div>
		);
	}
}

export default Login;