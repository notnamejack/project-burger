import { Counter, CurrencyIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { data } from "../../data/data";
import clsx from 'clsx';
import s from './burger-igredients.module.scss';

interface IBurgerIngredients{
	height: number,
	selectIngredients: any[],
	onAddIngredients: (value: any) => void
}


export function BurgerIngredients ({height, selectIngredients, onAddIngredients}: IBurgerIngredients){
	const [current, setCurrent] = useState('Булки');
	const [bun, setBun] = useState(data.filter(i => i.type === 'bun'));
	const [main, setMain] = useState(data.filter(i => i.type === 'main'));
	const [sauce, setSauce] = useState(data.filter(i => i.type === 'sauce'));

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
					<p className="text text_type_main-medium mb-6">Булки</p>
					<ul className={`${clsx(s.items)} pl-1`}>
						{bun.map(item =>
							<li key={item._id} className={clsx(s.item)} onClick={() => onAddIngredients(item)}>
								{selectIngredients.find(i => i._id === item._id) && <Counter count={selectIngredients.filter(i => i._id === item._id).length}
								size="default" extraClass="m-1" />}
								<img alt={item.name} src={item.image}/>
								<p className="text text_type_digits-default">{item.price}<CurrencyIcon type="primary"/></p>
								<p className="text text_type_main-default">{item.name}</p>
							</li>
						)}
					</ul>
				</li>
				<li className="mt-10">
					<p className="text text_type_main-medium mb-6">Соусы</p>
					<ul className={`${clsx(s.items)} pl-1`}>
						{sauce.map(item =>
							<li key={item._id} className={clsx(s.item)} onClick={() => onAddIngredients(item)}>
								{selectIngredients.find(i => i._id === item._id) && <Counter count={selectIngredients.filter(i => i._id === item._id).length}
								size="default" extraClass="m-1" />}
								<img alt={item.name} src={item.image}/>
								<p className="text text_type_digits-default">{item.price}<CurrencyIcon type="primary"/></p>
								<p className="text text_type_main-default">{item.name}</p>
							</li>
						)}
					</ul>
				</li>
				<li className="mt-10">
					<p className="text text_type_main-medium mb-6">Начинки</p>
					<ul className={`${clsx(s.items)} pl-1`}>
						{main.map(item =>
							<li key={item._id} className={clsx(s.item)} onClick={() => onAddIngredients(item)}>
								{selectIngredients.find(i => i._id === item._id) && <Counter count={selectIngredients.filter(i => i._id === item._id).length}
								size="default" extraClass="m-1" />}
								<img alt={item.name} src={item.image}/>
								<p className="text text_type_digits-default">{item.price}<CurrencyIcon type="primary"/></p>
								<p className="text text_type_main-default">{item.name}</p>
							</li>
						)}
					</ul>
				</li>
			</ul>

		</div>
	)
}