import clsx from 'clsx';
import s from './burger-ingredient-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addItem, deleteItem, moveItem } from '../../services/ingredients-select-splice';
import { openModal } from '../../services/ingredients-details-splice';
import { closeModal, openModal as  openDetailModal} from '../../services/order-splice';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredients } from '../../data/ingredients';
import type { Identifier, XYCoord } from 'dnd-core'

interface IBurgerIngredient{
	ingredient: IIngredients,
	index: number
}

interface DragItem {
	index: number,
	ingredient: IIngredients,
	id: string,
	type: string,
  }

export function BurgerIngredientConstructor ({ingredient, index}:IBurgerIngredient){

	const dispatch = useDispatch();

	const ref = useRef<HTMLLIElement>(null)

	const [{ isDragging }, drag] = useDrag({
		type: "burger",
		item: () => {
		  return { ingredient, index }
		},
		collect: (monitor: any) => ({
		  isDragging: monitor.isDragging(),
		}),
	  })

	  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
	  accept: "burger",
	  collect(monitor) {
		return {
		  handlerId: monitor.getHandlerId(),
		}
	  },
	  hover(item: DragItem, monitor) {
		if (!ref.current) {
		  return
		}
		const dragIndex = item.index
		const hoverIndex = index

		if (dragIndex === hoverIndex) {
		  return
		}

		const hoverBoundingRect = ref.current?.getBoundingClientRect()

		const hoverMiddleY =
		  (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		const clientOffset = monitor.getClientOffset()

		const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		  return
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		  return
		}
		dispatch(moveItem({fromIndex: dragIndex, toIndex: hoverIndex, item: item.ingredient}))

		item.index = hoverIndex
	  },
	})


	drag(drop(ref));

	return (
		<li ref={ref} className={clsx(s.item)} key={`${index}_${ingredient._id}`} data-handler-id={handlerId}>
			<DragIcon type="primary"/>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => dispatch(deleteItem({item: ingredient}))}
			/>
		</li>
	)
}

