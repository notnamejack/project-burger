import React, { useState } from "react";
import clsx from 'clsx';
import s from './main.module.scss';
import BugerIgredients from '../components/burger-ingredients';

export function Main (){

	const [selectIngredients, setSelectIngredients] = useState<any[]>([]);

	const handlerAddIngredients = (item: any) =>{
		setSelectIngredients([...selectIngredients, item]);
	}

	return(
		<div className={clsx(s.container)}>
			<BugerIgredients selectIngredients={selectIngredients} onAddIngredients={handlerAddIngredients}/>

		</div>
	)
}