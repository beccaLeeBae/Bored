import React, { Component } from "react";
import axios from 'axios';
import "../App.css";

class Signup extends Component {
	constructor(){
		super();
		this.state = {
			inputs: {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			}
		}
	}

	signUp(e){
		e.preventDefault();
		axios.post(`${this.props.url}/users`, this.state.inputs).then(res => {
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

		const inactiveButton = {
			opacity: 0.5,
			cursor: 'auto',
			boxShadow: 'none'
		}

		return (
			<div className="form-right">
				<form onSubmit={this.signUp.bind(this)}>
					<input type="text" placeholder="Name" value={this.state.inputs.name} onChange={e => this.changeInput(e, 'name')}/>
					<input type="email" placeholder="Email" value={this.state.inputs.email} onChange={e => this.changeInput(e, 'email')}/>
					<input type="password" placeholder="Password" value={this.state.inputs.password} onChange={e => this.changeInput(e, 'password')}/>
					<input type="password" placeholder="Confirm password" value={this.state.inputs.password_confirmation} onChange={e => this.changeInput(e, 'password_confirmation')}/>
					<button type="submit">Sign Up</button>
				</form>
				<button style={inactiveButton} onClick={this.props.toggleMode}>Log In</button>
			</div>
		);
	}
}

export default Signup;