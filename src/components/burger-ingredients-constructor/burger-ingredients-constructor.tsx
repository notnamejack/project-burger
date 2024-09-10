import clsx from 'clsx';
import s from './burger-ingredients-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addItem, deleteItem } from '../../services/ingredients-select-splice';
import { openModal } from '../../services/ingredients-details-splice';
import { closeModal, openModal as  openDetailModal} from '../../services/order-splice';
import { useDrop } from 'react-dnd';
import { IIngredients } from '../../data/ingredients';
import { BurgerIngredientConstructor } from '../burger-ingredient-constructor/burger-ingredient-constructor';

interface IBurgerConstructor{
	height: number
}

export function BurgerIngredientsConstructor ({height}:IBurgerConstructor){

	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items);
	const dispatch = useDispatch();

	const [{ isHover }, dropRef] = useDrop({
		accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
		drop: (item: IIngredients) => {
			dispatch(addItem({item: item, type: item.type}));
		}
	  });
	return (
		<ul className={clsx(s.items)} ref={dropRef}
			style={{ height: height - 484 < (selectIngredients.length) * 90 ? height - 524 :'auto',
				paddingRight: height - 484 < (selectIngredients.length) * 90 ? 0 : 15
			}}>
			{selectIngredients.map((item, index) =>
				<BurgerIngredientConstructor ingredient={item} index={index} key={index}/>)
			}
			{selectIngredients.length === 0 &&
				<div className={`${clsx(s.bun)} ${isHover && clsx(s.hover)} constructor-element`}>
					<p className="text text_type_main-default">Выберите начинку или соус</p>
				</div>
			}
		</ul>
	)
}