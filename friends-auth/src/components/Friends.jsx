import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { axiosWithAuth } from './../utils/axiosWithAuth';

export const Friends = () => {
	const { friends, setFriends } = useState([]);

	const componentDidMount = () => {
		getFriends();
	};
	const getFriends = () => {
		//fetch initial data - only logged in users can see
		//using axiosWithAuth to send the token on the header of the request
		axiosWithAuth()
			.get('api/data')
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h1>My friends</h1>
		</div>
	);
};
