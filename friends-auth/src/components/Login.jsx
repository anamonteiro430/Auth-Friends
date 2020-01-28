import React from 'react';
import axios from 'axios';

class Login extends React.Component {
	state = {
		credentials: {
			username: '',
			password: ''
		}
	};

	handleChanges = e => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	submit = e => {
		e.preventDefault();
		//make POST  request to server
		axios
			.post('http://localhost:5000/api/login', this.state.credentials)
			.then(res => console.log(res));
	};

	render() {
		return (
			<div>
				<form onSubmit={this.submit}>
					<input
						type='text'
						name='username'
						value={this.state.credentials.username}
						onChange={this.handleChanges}
					/>
					<input
						type='password'
						name='password'
						value={this.state.credentials.password}
						onChange={this.handleChanges}
					/>
					<button>See my friends</button>
				</form>
			</div>
		);
	}
}

export default Login;
