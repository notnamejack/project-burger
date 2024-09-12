import clsx from 'clsx';
import s from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { setIngredient, deleteItem, setBun } from '../../services/ingredients-select-splice/reducer';
import { openModal } from '../../services/ingredients-details-splice/reducer';
import { closeModal, openModal as  openDetailModal} from '../../services/order-splice/reducer';
import { useDrop } from 'react-dnd';
import { IIngredients } from '../../data/ingredients';
import BurgerIngredientsConstructorfunction from '../burger-ingredients-constructor';
import BurgerIngredientsConstructor from '../burger-ingredients-constructor';

interface IBurgerConstructor{
	height: number
}

export function BurgerConstructor({height}: IBurgerConstructor){

	const openOrder = useSelector((state: RootState) => state.order.isOpen);
	const but = useSelector((state: RootState) => state.ingredientsSelect.bun);
	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items);

	const dispatch = useDispatch();

	const [{ isHover }, toppRef] = useDrop({
		accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
		drop: (item: IIngredients) => {
			if(item.type !== 'bun')
				dispatch(setIngredient(item));
			else
				dispatch(setBun(item));
		}
	  });

	const total = useMemo(() => {
		var total = 0;
			selectIngredients.forEach(item =>
				total += item.price,
			  )
		if(but)
			total += but.price * 2
		return total;
	}, [selectIngredients, but])

	return(
		<div className={`${clsx(s.constructor)} mt-25`}>
			<div className={clsx(s.body)} ref={toppRef}>
				<div className={clsx(s.fixed)}>
					{but && <ConstructorElement
						type="top"
						isLocked={true}
						text={`${but.name} (верх)`}
						price={but.price}
						thumbnail={but.image}
					/>}
					{!but &&
					<div className={`${clsx(s.bun)} ${isHover && clsx(s.hover)} constructor-element constructor-element_pos_top`}>
						<p className="text text_type_main-default">Выберите булку</p>
					</div>}
				</div>
				{selectIngredients.length !== 0 && <BurgerIngredientsConstructor height={height}/>}
				{selectIngredients.length === 0 &&
					<div className={clsx(s.fixed)}>
						<div className={`${clsx(s.bun)} ${isHover && clsx(s.hover)} constructor-element`}>
							<p className="text text_type_main-default">Выберите начинку или соус</p>
						</div>
					</div>
				}
				<div className={clsx(s.fixed)}>
					{but && <ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${but.name} (низ)`}
						price={but.price}
						thumbnail={but.image}
					/>}
					{!but &&
					<div className={`${clsx(s.bun)} ${isHover && clsx(s.hover)} constructor-element constructor-element_pos_bottom`}>
						<p className="text text_type_main-default">Выберите булку</p>
					</div>}
				</div>
			</div>
			<div className={clsx(s.footer)}>
				<p className="text text_type_digits-medium">{`${total} `}<CurrencyIcon type="primary" /></p>
				<Button htmlType="button" type="primary" size="large" onClick={() => dispatch(openDetailModal())}>
					Оформить заказ
				</Button>
			</div>
			{openOrder &&
				<Modal onClose={() => dispatch(closeModal())}>
					<OrderDetails/>
				</Modal>
			}
		</div>
	)
}