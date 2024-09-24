import { AppHeader, IngredientDetails, Modal, OnlyAuth, OnlyUnAuth } from '../components';
import {  Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ForgotPassword, Login, Main, Profile, ProfileUser, Register, ResetPassword } from '../pages';
import { useEffect } from 'react';
import { checkUserAuth } from '../services/auth/actions';
import { useAppDispatch } from '../services/store';
import { closeModal } from '../services/ingredients-details-splice/reducer';
import { OnlyReset } from '../components/protected-route';


export const App = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };

	const handleModalClose = () => {
	  navigate(-1);
	  dispatch(closeModal())
	};

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

	return (
		<>
			<AppHeader/>
			<main>
				<Routes location={state?.backgroundLocation || location}>
					<Route path='/' element={<Main/>}/>
					<Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />}/>
					<Route path='/register' element={<OnlyUnAuth component={<Register/>} />}/>
					<Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>} />}/>
					<Route path='/reset-password' element={<OnlyReset component={<ResetPassword/>} />}/>
					<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
						<Route path='' element={<ProfileUser/>}/>
						<Route path=':orders' element={<></>}/>
					</Route>
				</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route
					path='/ingredients/:ingredientId'
					element={
						<Modal title='Детали ингредиента' onClose={handleModalClose}>
							<IngredientDetails/>
						</Modal>
					}
					/>
				</Routes>
			)}
			</main>
		</>
	);
};
