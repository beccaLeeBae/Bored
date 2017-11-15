import React, { Component } from 'react';
import '../App.css';

class Form extends Component {
		constructor(props){
		super(props);
		this.state = {
			newUser: true
		}
	}
render(){
	return(
		<div className="form-content">
		<div className="form-left">
		<p className="bored-logo">Bored</p>
		<p className="bored-intro">Entertainment recommendations when your brain is feeling dull</p>
		</div>
			{this.state.newUser === false && (
			<div className="form-right">
			<form>
			<input type="email" placeholder="Email"/>
			<input type="password" placeholder="Password"/>
			<input type="submit" value="Log In"/>
			</form>
			<p>Register</p>
			</div>
			)}
			{this.state.newUser === true && (
			<div className="form-right">
			<form>
			<input type="text" placeholder="Name"/>
			<input type="email" placeholder="Email"/>
			<input type="password" placeholder="Password"/>
			<input type="password" placeholder="Confirm password"/>
			<input type="submit" value="Sign Up"/>
			</form>
			<p>Log In</p>
			</div>
			)}
		</div>
		)
}
}

export default Form;