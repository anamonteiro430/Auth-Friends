import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewFriend from './NewFriend';

class Friends extends React.Component {
	state = {
		loading: false,
		sad: false,
		friends: []
	};

	componentDidMount = () => {
		console.log('mounting');

		this.getFriends();
	};

	getFriends = () => {
		this.setState({ loading: true });
		//fetch initial data - only logged in users can see
		//using axiosWithAuth to send the token on the header of the request
		axiosWithAuth()
			.get('/friends')
			.then(res => {
				this.setState({
					loading: false,
					friends: res.data
				});
			})
			.catch(err => console.log(err));
	};

	delete = friend => {
		this.setState({ sad: true });

		const id = friend.id;

		axiosWithAuth()
			.delete(`/friends/${id}`)
			.then(res => {
				setTimeout(() => {
					const friends = this.state.friends.filter(f => f.id !== Number(id));
					console.log('friends', friends);
					this.setState({ sad: false, friends: friends });
				}, 500);
			})
			.catch(err => console.log(err));
	};

	/* 	setTimeout(() => {
		res.send(friends);
	}, 1000); */

	render() {
		if (this.state.loading) {
			return <h1>WHERE ARE MY FRIENDS?</h1>;
		} else if (this.state.sad) {
			return (
				<>
					<h1></h1>
					<img src='https://data.whicdn.com/images/323473636/original.jpg' />
				</>
			);
		}
		return (
			<div>
				<h1>My friends</h1>

				<NewFriend />
				<div className='f'>
					{this.state.friends.map(friend => (
						<>
							<div className='friends' key={friend.id}>
								<h4>{friend.name}</h4>
								<h4>{friend.age}</h4>
								<p>{friend.email}</p>
								<button onClick={() => this.delete(friend)}>X</button>
							</div>
						</>
					))}
				</div>
			</div>
		);
	}
}

export default Friends;
