import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouterProvider from './provider/AppRouterProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<DndProvider backend={HTML5Backend}>
			<AppRouterProvider />
		</DndProvider>
	</React.StrictMode>
);
