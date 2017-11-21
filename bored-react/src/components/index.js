import React, { Component } from 'react';
import Play from '../images/play.png';
import Down from '../images/down.png';
import Form from './form';
import '../App.css';

class Index extends Component {
constructor(){
	super();
	this.state = {
		moveToForm: false
	}
}
showForm(){
	this.setState({ moveToForm: true });
}

render(){
	return(
		<div className="main-content">
		{this.state.moveToForm === false && (
		<div className="index-content">
		<div className="index-top">
		<img src={Play} alt="Bored Play Button" className="play" width="238px" />
		<p className="bored-display-index">Bored</p>
		</div>
		<div className="index-bottom">
		<img src={Down} alt="Down Arrow" className="next-page" onClick={this.showForm.bind(this)}/>
		</div>
		</div>
		)}
		{this.state.moveToForm === true && (
			<Form/>
			)}
		</div>
		)
}
}

export default Index;