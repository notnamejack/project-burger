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

interface IBurgerConstructor{
	height: number
}

export function BurgerConstructor({height}: IBurgerConstructor){

	const openOrder = useSelector((state: RootState) => state.order.isOpen);
	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items);
	const price = useSelector((state: RootState) => state.ingredientsSelect.total);
	const but = useSelector((state: RootState) => state.ingredientsSelect.bun);

	const dispatch = useDispatch();

	const [{ isHover }, dropRef] = useDrop({
		accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
		drop: (item: IIngredients) => {
			console.log(item);
			dispatch(addItem({item: item, type: item.type}));
		}
	  });

	return(
		<div className={`${clsx(s.constructor)} mt-25`}>
			<div className={clsx(s.body)} ref={dropRef}>
				<div className={clsx(s.fixed)}>
					{but && <ConstructorElement
						type="top"
						isLocked={true}
						text={`${but.name} (верх)`}
						price={but.price}
						thumbnail={but.image}
					/>}
				</div>
				<ul className={clsx(s.items)}
					style={{ height: height - (but ? 484 : 284) < (selectIngredients.length) * 90 ? height - (but ? 524: 344) :'auto',
						paddingRight: height - (but ? 484 : 284) < (selectIngredients.length) * 90 ? 0 : 15
					 }}>
					{selectIngredients.map((item, index) =>
						<li className={clsx(s.item)} key={`${index}_${item._id}`}>
							{/* сделал див, чтоб открывать описание ингредиента */}
							<div className={clsx(s.click)} onClick={() => {dispatch(openModal({item}))}}>
								<DragIcon type="primary"/>
							</div>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								handleClose={() => dispatch(deleteItem({item}))}
							/>
						</li>)
					}
				</ul>
				<div className={clsx(s.fixed)}>
					{but && <ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${but.name} (низ)`}
						price={but.price}
						thumbnail={but.image}
					/>}
				</div>

			</div>
			{(price || price !== 0) &&
				<div className={clsx(s.footer)}>
					<p className="text text_type_digits-medium">{price}<CurrencyIcon type="primary" /></p>
					<Button htmlType="button" type="primary" size="large" onClick={() => dispatch(openDetailModal())}>
						Оформить заказ
					</Button>
				</div>
			}
			{openOrder &&
				<Modal onClose={() => dispatch(closeModal())}>
					<OrderDetails/>
				</Modal>
			}
		</div>
	)
}