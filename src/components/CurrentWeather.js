import React from 'react';
import './CurrentWeather.scss';

export const convertKevlinToFarenheit = k => {
	return Math.round((k - 273.15) * 1.8 + 32);
};

const CurrentWeather = ({
	currentWeather: {
		name,
		main,
		dt,
		main: { feels_like, humidity, temp, temp_max, temp_min },
		sys,
		sys: { country, sunrise, sunset },
		weather,
		wind,
		wind: { deg, speed },
	},
}) => {
	const getDate = (type, unixCode) => {
		const dateObj = new Date(unixCode * 1000);
		let dateStr = '';
		if (type === 'date') {
			const weekday = dateObj.toLocaleString('en-US', {
				weekday: 'long',
			});
			const month = dateObj.toLocaleString('en-US', { month: 'long' });
			const day = dateObj.toLocaleString('en-US', { day: 'numeric' });
			dateStr = `${weekday}, ${month} ${day}`;
			return dateStr;
		} else {
			const hour = dateObj.toLocaleString('en-US', {
				hour: 'numeric',
			}); // 10 AM
			const minute = dateObj.toLocaleString('en-US', {
				minute: 'numeric',
			}); // 30
			dateStr = hour.replace(' ', `:${minute} `);
			return dateStr;
		}
	};

	return (
		<div className='text-center'>
			<div className='day-card'>
				<h4 className='text-center'>
					{name}, {sys.country}
				</h4>
				<p className='text-center'>{getDate('date', dt)}</p>
				<div className='text-left align'>
					<p>Wind: {wind.speed}mph</p>
					<p>
						High: {convertKevlinToFarenheit(main.temp_max)}
						<span>&#176;</span>F Low:{' '}
						{convertKevlinToFarenheit(main.temp_min)}
						<span>&#176;</span>F
					</p>
					<p>Sunrise: {getDate('time', sys.sunrise)}</p>
					<p>Sunset: {getDate('time', sys.sunset)}</p>
				</div>
				<div className='align degrees'>
					<h3 className='text-center degrees'>
						{convertKevlinToFarenheit(main.temp)}
						<span>&#176;</span>F
					</h3>
					<div>
						<img
							className='align'
							src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
							alt='broken clouds'
							style={{ width: '120px', height: '120px' }}
						/>
						<h4 className='align descr'>
							{weather[0].description}
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
