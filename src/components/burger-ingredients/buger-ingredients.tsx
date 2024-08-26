import { Counter, CurrencyIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import clsx from 'clsx';
import s from './burger-igredients.module.scss';
import { IIngredients } from "../../data/ingredients";

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

interface IIngredientItem{
	title: string;
	items: IIngredients[],
	selectIngredients: IIngredients[],
	handlerAdd: (value: IIngredients) => void
}

function Ingredient ({title, items, selectIngredients, handlerAdd}: IIngredientItem){
	return (
		<>
			<p className="text text_type_main-medium mb-6">{title}</p>
			<ul className={`${clsx(s.items)} pl-1`}>
				{items.map(item =>
					<li key={item._id} className={clsx(s.item)} onClick={() => handlerAdd(item)}>
						{selectIngredients.find(i => i._id === item._id) && <Counter count={selectIngredients.filter(i => i._id === item._id).length}
						size="default" extraClass="m-1" />}
						<img alt={item.name} src={item.image}/>
						<p className="text text_type_digits-default">{item.price}<CurrencyIcon type="primary"/></p>
						<p className="text text_type_main-default">{item.name}</p>
					</li>
				)}
			</ul>
		</>
	)
}