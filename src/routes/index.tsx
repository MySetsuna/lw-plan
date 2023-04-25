import React from 'react';
/* eslint-disable react-hooks/rules-of-hooks */
import App from '@/App';
import ErrorPage from '@/ErrorPage';

import MemberCard from '../example/MemberCard';
import Point from '../example/Point';
import Welcome from '@/components/Welcome';
import Examples from '@/components/Examples';
import TreeList from '@/components/TreeList';
import ColumnSetting from '@/components/UsefulTable/components/ColumnSetting';
import TreeTable from '@/components/UsefulTable/components/TreeTable';
const appRoutes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		// loader: rootLoader,
		// action: rootAction,
		children: [
			{
				index: true,
				element: <Welcome />
			},
			{
				path: 'treelist',
				element: <TreeList />
			},
			{
				path: 'sorter',
				element: <ColumnSetting />
			},
			{
				path: 'treetable',
				element: <TreeTable />
			},
			{
				path: 'examples',
				element: <Examples />,
				children: [
					{
						path: 'Point',
						element: <Point />
					},
					{
						path: 'MemberCard',
						element: <MemberCard />
					}
				]
			}
		]
	}
];
export default appRoutes;
