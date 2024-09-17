import { AppHeader } from '../components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../pages';


export const App = () => {
	return (
		<div>
			<AppHeader/>
			<main>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Main/>}/>
					</Routes>
				</BrowserRouter>
			</main>
		</div>
	);
};
