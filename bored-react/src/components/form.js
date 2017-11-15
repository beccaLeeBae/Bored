import React, { Component } from 'react';
import '../App.css';

class Form extends Component {
render(){
	return(
		<div className="form-content">
		<div className="form-left">
		<p className="bored-logo">Bored</p>
		<p className="bored-intro">Entertainment recommendations when your brain is feeling dull</p>
		</div>
		<div className="form-right">
		<form>
			<input type="email" placeholder="Email"/>
			<input type="password" placeholder="Password"/>
			<input type="submit" value="Log In"/>
		</form>
		<p>Register</p>
		</div>
		</div>
		)
}
}

export default Form;