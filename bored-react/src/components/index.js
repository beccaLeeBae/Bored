import React, { Component } from 'react';
import Play from '../images/play.png';
import '../App.css';

class Index extends Component {
	constructor(props){
		super(props);
		this.state = {
			newUser: false
		}
	}

render(){
	return(
		<div className="index-content">
		<img src={Play} alt="Bored Play Button" width="238px" />
		<p className="bored-display-index">Bored</p>
		</div>
		)
}
}

export default Index;