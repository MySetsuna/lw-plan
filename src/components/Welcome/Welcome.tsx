/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Outlet } from 'react-router-dom';

const Welcome = () => {
	return (
		<>
			<h1>Let's Life With Plan</h1>
			<div>Welcome, 000</div>
			<Outlet />
		</>
	);
};

Welcome.propTypes = {};

export { Welcome as default };
