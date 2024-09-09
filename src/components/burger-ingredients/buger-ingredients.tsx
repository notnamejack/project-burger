import { useState } from "react";
import clsx from 'clsx';
import s from './burger-igredients.module.scss';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../igredients";

interface IBurgerIngredients{
	height: number
}

export function BurgerIngredients ({ height }: IBurgerIngredients){
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
					<Ingredient title={"Булки"} type={'bun'}/>
				</li>
				<li className="mt-10">
					<Ingredient title={"Соусы"} type={'sauce'}/>
				</li>
				<li className="mt-10">
					<Ingredient title={"Начинки"} type={'main'}/>
				</li>
			</ul>

		</div>
	)
}