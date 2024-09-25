import clsx from 'clsx';
import s from './burger-ingredient-constructor.module.scss';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { deleteItem, moveItem } from '../../services/ingredients-select-splice/reducer';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredients } from '../../data/ingredients';
import type { Identifier, XYCoord } from 'dnd-core'
import { useAppDispatch } from '../../services/store';

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

	const dispatch = useAppDispatch();

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
		dispatch(moveItem({fromIndex: dragIndex, toIndex: hoverIndex}))

		item.index = hoverIndex
	  },
	})


	drag(drop(ref));

	return (
		<li className={clsx(s.item)} ref={ref} data-handler-id={handlerId}>
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

