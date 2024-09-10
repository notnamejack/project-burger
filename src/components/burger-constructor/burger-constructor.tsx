import clsx from 'clsx';
import s from './burger-constructor.module.scss';
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
import BurgerIngredientsConstructorfunction from '../burger-ingredients-constructor';
import BurgerIngredientsConstructor from '../burger-ingredients-constructor';

interface IBurgerConstructor{
	height: number
}

export function BurgerConstructor({height}: IBurgerConstructor){

	const openOrder = useSelector((state: RootState) => state.order.isOpen);
	const price = useSelector((state: RootState) => state.ingredientsSelect.total);
	const but = useSelector((state: RootState) => state.ingredientsSelect.bun);

	const dispatch = useDispatch();

	const [{ isHover }, toppRef] = useDrop({
		accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
		drop: (item: IIngredients) => {
			dispatch(addItem({item: item, type: item.type}));
		}
	  });

	return(
		<div className={`${clsx(s.constructor)} mt-25`}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.fixed)} ref={toppRef}>
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
				<BurgerIngredientsConstructor height={height}/>
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
				<p className="text text_type_digits-medium">{`${price} `}<CurrencyIcon type="primary" /></p>
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