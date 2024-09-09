import { useEffect, useState } from 'react';
import { AppHeader } from '../components';
import Main from '../page';
import { IIngredients } from '../data/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setItems } from '../services/ingredients-splice';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [codeError, setCodeError] = useState('');

  	const dispatch = useDispatch()

	useEffect(()=>{
		if(!isLoading){
			getIngredients();
		}
	},[])

	const getIngredients = () => {
		setIsLoading(true);
		fetch(url)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			// записываю в переменую, чтоб если делать обработку то от изменения ее
			return Promise.reject(setCodeError(`${res.status}`));

		})
		.then(data => dispatch(setItems(data.data)))
		.catch(e => setHasError(true))
		.finally(() => setIsLoading(false));
	}

	return (
		<div>
			<AppHeader/>
			<main>
				<Main/>
			</main>
		</div>
	);
};
