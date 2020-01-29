import axios from 'axios';

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	//whenever the app needs to exchange data with a protected endpoint, it imports this module instead of the normal axios
	return axios.create({
		baseURL: 'http://localhost:5000/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	});
};
