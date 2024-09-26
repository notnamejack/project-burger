import { useEffect, useRef, useState } from "react";
import clsx from 'clsx';
import s from './burger-igredients.module.scss';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../igredients";

interface IBurgerIngredients{
	height: number
}

export function BurgerIngredients ({ height }: IBurgerIngredients){
	const [current, setCurrent] = useState('Булки');

	const ref = useRef<HTMLUListElement>(null);
	const refBun = useRef<HTMLLIElement>(null);
	const refSauce = useRef<HTMLLIElement>(null);
	const refMain = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if(ref.current){
			const _ref = ref.current;
			_ref.addEventListener("scroll", handlerScroll)
			return () => {
				_ref.removeEventListener("scroll", handlerScroll)
			}
		}
	},[])

	const handlerScroll = () => {
		if(refBun.current && refBun.current.getBoundingClientRect().y <= 284)
			setCurrent('Булки')
		if(refSauce.current && refSauce.current?.getBoundingClientRect().y <= 284)
			setCurrent('Соусы')
		if(refMain.current && refMain.current?.getBoundingClientRect().y <= 284)
			setCurrent('Начинки')
	}

	return(
		<div>
			<p className="text text_type_main-large mb-5 mt-10">
				Соберите бургер
			</p>
			<div className={clsx(s.tabs)}>
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
			<ul className={`${clsx(s.ingredients)} pt-10`} style={{height: height - 300}} ref={ref}>
				<li ref={refBun}>
					<Ingredients title={"Булки"} type={'bun'}/>
				</li>
				<li className="mt-10" ref={refSauce}>
					<Ingredients title={"Соусы"} type={'sauce'}/>
				</li>
				<li className="mt-10" ref={refMain}>
					<Ingredients title={"Начинки"} type={'main'}/>
				</li>
			</ul>
		</div>
	)
}