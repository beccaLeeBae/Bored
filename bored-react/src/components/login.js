import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Login extends Component {
	constructor(){
		super();
		this.state = {
			inputs: {
				email: "",
				password: ""
			}
		}
	}

	login(e){
		e.preventDefault();
		axios.post(`${this.props.url}/login`, this.state.inputs).then(res => {
			this.props.setUser(res.data);
		})
	}

	changeInput(e, input) {
		const val = e.target.value;
		this.setState(prev => {
		prev.inputs[input] = val;
		return prev;
		})
	}

	render() {
		return (
			<div className="form-right">
				<form onSubmit={this.login.bind(this)}>
					<input type="email" placeholder="Email" value={this.state.inputs.email} onChange={e => this.changeInput(e, "email")}/>
					<input type="password" placeholder="Password" value={this.state.inputs.password} onChange={e => this.changeInput(e, "password")}/>
					<button type="submit">Log In</button>
				</form>
				<button onClick={this.props.toggleMode}>Register</button>
			</div>
		);
	}
}

export default Login;