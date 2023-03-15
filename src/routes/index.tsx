import React from 'react';
/* eslint-disable react-hooks/rules-of-hooks */
import App from '@/App';
import ErrorPage from '@/ErrorPage';

import MemberCard from '../example/MemberCard';
import Point from '../example/Point';
import Welcome from '@/components/Welcome';
import Examples from '@/components/Examples';
import TreeList from '@/components/TreeList';
import PowerTreeList from '@/components/PowerTreeList';
import { DraggableTitleSorter } from '@/components/PowerTreeList/components/ColumnSetting/components/DraggableTitle';
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
				path: 'newtreelist',
				element: (
					<PowerTreeList>
						<DraggableTitleSorter />
					</PowerTreeList>
				)
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
