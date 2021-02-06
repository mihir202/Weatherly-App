import React, { Component } from 'react';
import { convertKevlinToFarenheit } from './CurrentWeather';
import './DailyForecast.scss';

class DailyForecast extends Component {
	getWeekday = unixCode => {
		const dateObj = new Date(unixCode * 1000);
		const weekDay = dateObj.toLocaleString('en-US', { weekday: 'long' });
		return weekDay;
	};

	render() {
		// destructure props object
		const {
			dailyWeather: {
				// ignore first element (the current day) then destructure the rest of the array
				daily: [, ...remDays],
			},
		} = this.props;

		return (
			<div className='daily-content'>
				<div className='day-forecast container'>
					<div className='row'>
						{remDays.map(day => (
							<div className='day-card col-sm' key={day.dt}>
								{this.getWeekday(day.dt)}
								<img
									src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
									alt={day.weather[0].description}
								/>
								<p>
									{convertKevlinToFarenheit(day.temp.day)}
									<span>&#176;</span>F
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default DailyForecast;
