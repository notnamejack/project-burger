import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import s from './main.module.scss';
import {BurgerConstructor, BurgerIngredients} from '../components'
import { v4 } from "uuid";
import { IIngredients } from "../data/ingredients";

interface IMain{
	data: IIngredients[]
}

export function Main ({data}: IMain){

	const [ingredients, setIngredients] = useState<IIngredients[]>()
	const [selectIngredients, setSelectIngredients] = useState<IIngredients[]>([]);
	const [price, setPrice] = useState(0);
	const [height, setHeight] = useState(window.document.documentElement.clientHeight);

	useEffect(() => {
		setIngredients(data);
	},[data])

	useEffect(() => {
		if(selectIngredients.length > 0){
			var total = 0;
			selectIngredients.forEach(item =>
				total += item.price,
			  )
			setPrice(total);
		}
		else{
			setPrice(0);
		}
	}, [selectIngredients])

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
			<BurgerIngredients
				bun={ingredients?.filter(i => i.type === 'bun') || []}
				main={ingredients?.filter(i => i.type === 'main') || []}
				sauce={ingredients?.filter(i => i.type === 'sauce') || []}
				height={height}
				selectIngredients={selectIngredients}
				onAddIngredients={handlerAddIngredients}/>
			<BurgerConstructor
				height={height}
				selectIngredients={selectIngredients}
				price={price}
				onDeleteIngredients={handlerDeleteIngredients}/>
		</div>
	)
}