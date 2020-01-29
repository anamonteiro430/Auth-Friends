import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewFriend from './NewFriend';

class Friends extends React.Component {
	state = {
		friends: []
	};

	componentDidMount = () => {
		console.log('mounting');

		this.getFriends();
	};

	getFriends = () => {
		//fetch initial data - only logged in users can see
		//using axiosWithAuth to send the token on the header of the request
		axiosWithAuth()
			.get('/friends')
			.then(res => {
				this.setState({
					friends: res.data
				});
			})
			.catch(err => console.log(err));
	};

	delete = friend => {
		const id = friend.id;
		console.log(id);
		axiosWithAuth()
			.delete(`/friends/:${id}`)
			.then(res => {
				console.log(res.data);
				console.log(id);
				const friends = this.state.friends.filter(f => f.id !== Number(id));
				console.log('friends', friends);
				this.setState({ friends: friends });
			})
			.catch(err => console.log(err));
	};

	render() {
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
