import { useEffect, useState } from "react";
import clsx from 'clsx';
import s from './main.module.scss';
import {BurgerConstructor, BurgerIngredients} from '../components'
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export function Main (){

	const [height, setHeight] = useState(window.document.documentElement.clientHeight);

	useEffect(() => {
		window.addEventListener("resize", trackMousePos)
		return () => {
			window.removeEventListener("resize", trackMousePos)
		}
	  },[])

	const trackMousePos = () => {
		setHeight(window.document.documentElement.clientHeight);
	};

	const handlerDeleteIngredients = (index: string) =>{
		// setSelectIngredients(selectIngredients.filter(i => i.index !== index));
	}

	return(
		<div className={clsx(s.container)}>
			<BurgerIngredients height={height}/>
			<BurgerConstructor height={height} onDeleteIngredients={handlerDeleteIngredients}/>
		</div>
	)
}