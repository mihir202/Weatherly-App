import React, { Component } from 'react';
import './Nav.scss';

class Nav extends Component {
	render() {
		return (
			<div className='nav-container'>
				<ul className='nav justify-content-start'>
					<li className='nav-item'>
						<a className='navbar-brand text-white' href='/'>
							<h3>Weatherly</h3>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default Nav;
