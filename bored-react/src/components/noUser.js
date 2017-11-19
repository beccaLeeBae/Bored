import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class NoUser extends Component {
render(){
	return(
		<div className="index-content">
		<p className="no-user-text">404</p>
		<p>No user found :(</p>
		<Link to="/"><button>Log In</button></Link>
		</div>
		)
}
}

export default NoUser;