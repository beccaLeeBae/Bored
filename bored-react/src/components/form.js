import React, { Component } from 'react';
import Login from './login';
import Signup from './signup';
import '../App.css';

class Form extends Component {
		constructor(props){
		super(props);
		this.state = {
			newUser: false
		}
	}

toggleMode(event){
	event.preventDefault();
	this.setState(prev => {
		prev.newUser = prev.newUser === false ? true : false;
		return prev
	})
}

render(){
	return(
		<div className="form-content">
		<div className="form-left">
		<p className="bored-logo">Bored</p>
		<p className="bored-intro">Entertainment recommendations when your brain is feeling dull</p>
		</div>
			{this.state.newUser === false ? (
				<Login {...this.props} toggleMode={this.toggleMode.bind(this)}/>
				) : (
				<Signup {...this.props} toggleMode={this.toggleMode.bind(this)}/>
				)}
		</div>
		)
}
}

export default Form;