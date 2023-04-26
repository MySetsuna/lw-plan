import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App () {
	return (
		<div className="app">
			<div className="app-header">
				<Header />
			</div>
			<div className="app-body">
				<div className="side">
					<div className="side-title">目录</div>
					<div className="links">
						<NavLink to={'examples'}>examples</NavLink>
						<NavLink to={'treelist'}>treelist</NavLink>
						<NavLink to={'sorter'}>sorter</NavLink>
						<NavLink to={'treetable'}>treetable</NavLink>
					</div>
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
