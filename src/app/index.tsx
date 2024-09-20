import { AppHeader } from '../components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgotPassword, Login, Main, Profile, Register } from '../pages';


export const App = () => {
	return (
		<BrowserRouter>
			<AppHeader/>
			<main>
				<Routes>
					<Route path='/' element={<Main/>}/>
					<Route path='/login' element={<Login/>}/>
					<Route path='/register' element={<Register/>}/>
					<Route path='/forgot-password' element={<ForgotPassword/>}/>
					<Route path='/reset-password' element={<ForgotPassword/>}/>
					<Route path='/profile' element={<Profile/>}>
						<Route path=':orders' element={<></>}/>
						<Route path='' element={<></>}/>
					</Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
};
