import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import { Friends } from './components/Friends';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';

function App() {
	return (
		<Router>
			<div className='App'>
				<Link to='/login'>Login</Link>
				<Link to='/friends'>My friends</Link>
				<Switch>
					<PrivateRoute path='/friends' component={Friends} />
					<Route path='/login' component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
