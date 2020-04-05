import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class NewFriend extends React.Component {
	state = {
		name: '',
		age: '',
		email: ''
	};

	handleChanges = e => {
		console.log('here');
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	addfriend = e => {
		e.preventDefault();
		console.log('here', this.state);
		axiosWithAuth()
			.post('/friends', this.state)
			.then(res => {
				console.log('here', this.state);
				this.setState([
					...this.state,
					{
						name: this.state.name,
						age: this.state.age,
						email: this.state.email
					}
				]);
				console.log(res.data);
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<>
				<form onSubmit={this.addfriend}>
					<input
						type='text'
						name='name'
						placeholder='name'
						value={this.state.name}
						onChange={this.handleChanges}
					/>
					<input
						type='text'
						name='age'
						placeholder='name'
						value={this.state.age}
						onChange={this.handleChanges}
					/>
					<input
						type='text'
						name='email'
						placeholder='name'
						value={this.state.email}
						onChange={this.handleChanges}
					/>
					<button>Add friend</button>
				</form>
			</>
		);
	}
}

export default NewFriend;
