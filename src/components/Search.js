import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
	state = { city: '' };

	handleSubmit = event => {
		event.preventDefault();
		this.props.getCurrentWeather(this.state.city);
		this.setState({ city: '' });
	};

	handleChange = event => {
		this.setState({ city: event.target.value });
	};

	render() {
		return (
			<div className='search'>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<input
							className='form-control'
							type='text'
							placeholder='Search a City'
							value={this.state.city}
							onChange={this.handleChange}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default Search;
