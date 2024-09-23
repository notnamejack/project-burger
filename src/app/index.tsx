import { AppHeader, IngredientDetails, OnlyAuth, OnlyUnAuth } from '../components';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ForgotPassword, Login, Main, Profile, ProfileUser, Register, ResetPassword } from '../pages';
import { useEffect } from 'react';
import { checkUserAuth } from '../services/auth/actions';
import { useAppDispatch } from '../services/store';


export const App = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
	  // Возвращаемся к предыдущему пути при закрытии модалки
	  navigate(-1);
	};

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

	return (
		<>
			<AppHeader/>
			<main>
				<Routes location={background || location}>
					<Route path='/' element={<Main/>}/>
					<Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />}/>
					<Route path='/register' element={<OnlyUnAuth component={<Register/>} />}/>
					<Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>} />}/>
					<Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>} />}/>
					<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
						<Route path='' element={<ProfileUser/>}/>
						<Route path=':orders' element={<></>}/>
					</Route>
				</Routes>
			</main>
			{background && (
				<Routes>
					<Route
					path='/ingredients/:ingredientId'
					element={
						<IngredientDetails />
					}
					/>
				</Routes>
			)}
		</>
	);
};
