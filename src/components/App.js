import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import openWeather from '../apis/openWeather';

import Nav from './Nav';
import Search from './Search';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';

import './App.scss';

const API_KEY = '297e2386527ec5c6a3b26f804d07563e';
class App extends Component {
	state = { currentWeather: null, dailyWeather: null };

	getCurrentWeather = async searchedCity => {
		const response = await openWeather.get(
			`/weather?q=${searchedCity}&APPID=${API_KEY}`
		);
		console.log(response.data);
		this.setState({ currentWeather: response.data });
		this.getDailyWeather(response.data.coord.lat, response.data.coord.lon);
	};

	getDailyWeather = async (lat, lon) => {
		const response = await openWeather.get(
			`/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_KEY}`
		);
		console.log(response.data);
		this.setState({ dailyWeather: response.data });
	};

	renderWeatherInfo = () => {
		if (
			this.state.currentWeather != null &&
			this.state.dailyWeather != null
		) {
			return (
				<div>
					<CurrentWeather
						currentWeather={this.state.currentWeather}
					/>
					<DailyForecast dailyWeather={this.state.dailyWeather} />
				</div>
			);
		} else {
			return (
				<div className='welcome'>
					<h4 className='text-center text-white'>
						Welcome to Weatherly, your most accurate weather site.
					</h4>
				</div>
			);
		}
	};

	render() {
		return (
			<div className='main-container'>
				<Nav />
				<Search getCurrentWeather={this.getCurrentWeather} />
				{this.renderWeatherInfo()}
			</div>
		);
	}
}

export default App;
