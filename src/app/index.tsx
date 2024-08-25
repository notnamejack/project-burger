import { useState } from 'react';
import AppHeader from '../components/app-header';
import Main from '../page';

export const App = () => {
	return (
		<div>
			<AppHeader/>
			<main>
				<Main/>
			</main>
		</div>
	);
};
