import { useState } from "react";
import clsx from 'clsx';
import s from './burger-igredients.module.scss';
import { IIngredients } from "../../data/ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../igredients";

interface IBurgerIngredients{
	bun: IIngredients[] | [];
	main: IIngredients[] | [];
	sauce: IIngredients[] | [];
	height: number,
	selectIngredients: IIngredients[],
	onAddIngredients: (value: IIngredients) => void
}

export function BurgerIngredients ({bun, main, sauce, height, selectIngredients, onAddIngredients}: IBurgerIngredients){
	const [current, setCurrent] = useState('Булки');

	return(
		<div>
			<p className="text text_type_main-large mb-5 mt-10">
				Соберите бургер
			</p>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<ul className={`${clsx(s.ingredients)} pt-10`} style={{height: height - 300}}>
				<li>
					<Ingredient title={"Булки"} items={bun} selectIngredients={selectIngredients} handlerAdd={onAddIngredients}/>
				</li>
				<li className="mt-10">
					<Ingredient title={"Соусы"} items={sauce} selectIngredients={selectIngredients} handlerAdd={onAddIngredients}/>
				</li>
				<li className="mt-10">
					<Ingredient title={"Начинки"} items={main} selectIngredients={selectIngredients} handlerAdd={onAddIngredients}/>
				</li>
			</ul>

		</div>
	)
}