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

	return (
		<ul className={clsx(s.items)}
			style={{ height: height - 484 < (selectIngredients.length) * 90 ? height - 524 :'auto',
				paddingRight: height - 484 < (selectIngredients.length) * 90 ? 0 : 15
			}}>
			{selectIngredients.map((item, index) =>
				<BurgerIngredientConstructor ingredient={item} index={index} key={item.index}/>)
			}
		</ul>
	)
}