import { AppHeader } from '../components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgotPassword, Login, Main, Profile, Register } from '../pages';


export const App = () => {
	return (
		<div>
			<AppHeader/>
			<main>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Main/>}/>
						<Route path='/login' element={<Login/>}/>
						<Route path='/register' element={<Register/>}/>
						<Route path='/forgot-password' element={<ForgotPassword/>}/>
						<Route path='/reset-password' element={<ForgotPassword/>}/>
						<Route path='/profile' element={<Profile/>}/>
					</Routes>
				</BrowserRouter>
			</main>
		</div>
	);
};
