import clsx from 'clsx';
import s from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { IIngredients } from '../../data/ingredients';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import OrderDetails from '../order-details';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface IBurgerConstructor{
	height: number,
	onDeleteIngredients: (index: string) => void
}

export function BurgerConstructor({height, onDeleteIngredients}: IBurgerConstructor){

	// const [but, setBut] = useState<IIngredients>();
	const [ingredient, setIngredient] = useState<IIngredients>();
	const [openIngredient, setOpenIngredient] = useState(false);
	const [openOrder, setOpenOrder] = useState(false);

	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items)
	const price = useSelector((state: RootState) => state.ingredientsSelect.total)
	const but = useSelector((state: RootState) => state.ingredientsSelect.bun)

	// useEffect(() => {
	// 	const find = selectIngredients.find(i => i.type === 'bun');
	// 	if(find && find._id !== but?._id){
	// 		setBut(find);
	// 	}
	// },[selectIngredients])

	const handlerOpenIngredient = (item: IIngredients) =>{
		setIngredient(item);
		setOpenIngredient(!openIngredient);
	}

	return(
		<div className={`${clsx(s.constructor)} mt-25`}>
			<div className={clsx(s.body)}>
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
							<div className={clsx(s.click)} onClick={() => {handlerOpenIngredient(item)}}>
								<DragIcon type="primary"/>
							</div>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								handleClose={() => onDeleteIngredients(item?.index || "")}
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
					<Button htmlType="button" type="primary" size="large" onClick={() => setOpenOrder(!openOrder)}>
						Оформить заказ
					</Button>
				</div>
			}
			{openIngredient &&
				<Modal title='Детали ингредиента' onClose={() => setOpenIngredient(false)}>
					<IngredientDetails ingredient={ingredient}/>
				</Modal>
			}
			{openOrder &&
				<Modal onClose={() => setOpenOrder(false)}>
					<OrderDetails/>
				</Modal>
			}
		</div>
	)
}