import React, { Component } from 'react';
import AppNavBar from '../components/appNavBar'
import ListCategories from '../components/listCategories'

class Home extends Component
{
	render()
	{
		return (
			<div>
				<AppNavBar />
				<ListCategories />
			</div>
		);
	}
}

export default Home;