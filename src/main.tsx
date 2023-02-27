import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouterProvider from './provider/AppRouterProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppRouterProvider />
	</React.StrictMode>
);
