import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="app">
			<div className="links">
				<NavLink to={'examples'}>examples</NavLink>
				<NavLink to={'treelist'}>treelist</NavLink>
			</div>
			<Outlet />
		</div>
	);
}

export default App;
