import React, { Component } from 'react';
import Nav from './nav';
import '../App.css';

class Results extends Component {
		constructor(props){
		super(props);
		this.state = {
			resultType: "out"
		}
	}
render(){
	return (
		<div className="results-content">
						<div className="search-header">
					<div className="results-text-content">
					<p className="results-logo">Bored</p>
					{this.state.resultType === "out" && (<p className="results-location">& leaving the house</p>)}
					{this.state.resultType === "in" && (<p className="results-location">& staying on the couch</p>)}
					</div>
					<Nav logoutUser={this.props.logoutUser} />
				</div>
				<div className="results-gallery">
				</div>
		</div>
		)
}
}

export default Results;