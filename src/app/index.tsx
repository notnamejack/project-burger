import { useEffect, useState } from 'react';
import { AppHeader } from '../components';
import Main from '../page';
import { IIngredients } from '../data/ingredients';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {

	const [data, setData] = useState<IIngredients[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [codeError, setCodeError] = useState('');

	useEffect(()=>{
		if(!isLoading && data.length === 0){
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
		.then(data => setData(data.data))
		.catch(e => setHasError(true))
		.finally(() => setIsLoading(false));
	}

	return (
		<div>
			<AppHeader/>
			<main>
				<Main data={data}/>
			</main>
		</div>
	);
};
