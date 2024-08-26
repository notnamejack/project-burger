import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import s from './main.module.scss';
import {BurgerConstructor, BurgerIngredients} from '../components'
import { v4 } from "uuid";

export function Main (){

	const [selectIngredients, setSelectIngredients] = useState<any[]>([]);
	const [price, setPrice] = useState();
	const [height, setHeight] = useState(window.document.documentElement.clientHeight);

	useEffect(() => {
		if(selectIngredients.length > 0){
			setPrice(selectIngredients.reduce(function(sum, elem) {
			return sum + elem.price;
			}, 0))
		}
	}, [selectIngredients])

	console.log(height)

	useEffect(() => {
		window.addEventListener("resize", trackMousePos)
		return () => {
			window.removeEventListener("resize", trackMousePos)
		}
	  },[])

	const trackMousePos = () => {
		setHeight(window.document.documentElement.clientHeight);
	};

	const newGuid = (): string => v4()

	const handlerAddIngredients = (item: any) =>{
		if (item.type === 'bun'){
			if(selectIngredients.filter(i => i.type === 'bun').length === 0)
				setSelectIngredients([...selectIngredients, {...item, index: newGuid}, {...item, index: newGuid}]);
			else
				setSelectIngredients([...selectIngredients.filter(i => i.type !== 'bun'), {...item, index: newGuid}, {...item, index: newGuid}])
		}
		else{
			setSelectIngredients([...selectIngredients, {...item, index: newGuid}]);
		}
	}

	const handlerDeleteIngredients = (index: string) =>{
		console.log(index)
		setSelectIngredients(selectIngredients.filter(i => i.index !== index));
	}

	return(
		<div className={clsx(s.container)}>
			<BurgerIngredients height={height} selectIngredients={selectIngredients} onAddIngredients={handlerAddIngredients}/>
			<BurgerConstructor height={height} selectIngredients={selectIngredients} price={price} onDeleteIngredients={handlerDeleteIngredients}/>
		</div>
	)
}