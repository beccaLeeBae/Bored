import React, { Component } from "react";
import "../App.css";

class Signup extends Component {
	render() {
		return (
			<div className="form-right">
				<form>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<input type="password" placeholder="Confirm password" />
					<input type="submit" value="Sign Up" />
				</form>
				<p>Log In</p>
			</div>
		);
	}
}

export default Signup;