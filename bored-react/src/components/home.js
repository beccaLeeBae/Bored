import React, { Component } from 'react';
import { Switch, Link, Route } from "react-router-dom";
import Index from './index';
import Search from './search';
import Account from './account';
import Form from './form';
import '../App.css';

class Home extends Component {
render() {
	return (
				<Switch>
				<Route exact path="/" render={props => (
					<Index /> )}/>
				<Route path="/login" render={props => (
					<Form /> )} />
				<Route path="/search" render={props => (
					<Search /> )} />
				<Route path="/account" render={props => (
					<Account /> )} />
				</Switch>
		)
}
}

export default Home;