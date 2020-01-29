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

	//after login the server returns the token
	//app saves the returned token to localStorage
	//so that the axiosWithAuth can grab it for other calls with the Authorization header
	submit = e => {
		e.preventDefault();
		//make POST  request to server
		// the server will "authenticate" the user based on their credentials
		// If they can be authenticated the server will return a token
		axios
			.post('http://localhost:5000/api/login', this.state.credentials)
			.then(res => {
				//set token to localStorage
				localStorage.setItem('token', res.data.payload);
				//directs user to this route
				this.props.history.push('/friends');
			})
			.catch(err => console.log(err));
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
