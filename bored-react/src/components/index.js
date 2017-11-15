import React, { Component } from 'react';
import Play from '../images/play.png';
import FontAwesome from 'react-fontawesome';
import '../App.css';

class Index extends Component {
render(){
	return(
		<div className="index-content">
		<img src={Play} alt="Bored Play Button" width="238px" />
		<p className="bored-display-index">Bored</p>
		<FontAwesome name='rocket'/>
		</div>
		)
}
}

export default Index;