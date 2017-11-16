import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Index from './components/index';
import Form from './components/form';
import Home from './components/home';
import axios from 'axios';
import Cookies from '../helpers/Cookies';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			user: false,
			mode: 'loading',
			url: 'http://localhost:3000'
		}
	}

	componentDidMount(){
		this.initUser();
	}

	initUser(){
		const token = Cookies.get('token');
		if (token && token !== ''){
			axios.get(`${this.state.url}/users/validate`, {params: {auth_token: token}})
			.then (res => {
				this.setState({user: res.data, mode: 'content'});
			})
			.catch(err => {
				Cookies.set('token', '')
				this.setState({ user: false, mode: 'auth' });
			})
		} else {
			this.setState({mode: 'auth'});
		}
	}

	setUser(user) {
		Cookies.set('token', user.token);
		this.setState({user: user, mode: 'content'});
	}

	logoutUser(){
		Cookies.set('token', '');
		this.setState({user: false, mode: 'auth'});
	}

	renderView(){
		if(this.state.mode === 'loading'){
			return(
				<Index />
			)
		} else if(this.state.mode === 'auth') {
			return(
				<Form setUser={this.setUser.bind(this)}
				url={this.state.url}
				/>
			)
		}else if(this.state.mode === 'content') {
			<Search 
			logoutUser={this.logoutUser.bind(this)}
			user={this.state.user}
			/>
		}
	}

	render(){
		return (
			<div>
			{this.renderView()}
			</div>
			)
	}

  // render() {
  //   return (
  //     <BrowserRouter>
  //     <Home />
  //     </BrowserRouter>
  //   );
  // }
}

export default App;
