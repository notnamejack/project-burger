import clsx from 'clsx';
import s from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { setIngredient, setBun } from '../../services/ingredients-select-splice/reducer';
import { useDrop } from 'react-dnd';
import { IIngredients } from '../../data/ingredients';
import BurgerIngredientsConstructor from '../burger-ingredients-constructor';
import { useSetOrderMutation} from '../../services/order/api';
import { addOrder } from '../../services/order-details-splice/reducer';
import { getUser } from '../../services/auth/reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal';

interface IBurgerConstructor{
	height: number
}

export function BurgerConstructor({height}: IBurgerConstructor){

	const but = useAppSelector((state) => state.ingredientsSelect.bun);
	const selectIngredients = useAppSelector((state) => state.ingredientsSelect.items);
	const [ addIngredients, { isLoading }, ] = useSetOrderMutation();
	const user = useAppSelector(getUser);
    const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

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


	const handlerSend = async () => {
		if(!user)
			return navigate('/login',{state: { from: location }})
		var ingredients = [];
		if(but){
			ingredients.push(but?._id);
			selectIngredients.forEach(item => {
				ingredients.push(item._id);
			})
			ingredients.push(but?._id);

			dispatch(addOrder(await addIngredients({ingredients: ingredients}).then(result => {return result.data})))
		}
	}

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
				<Button htmlType="button" type="primary" size="large" onClick={() => handlerSend()} disabled={isLoading}>
					Оформить заказ
				</Button>
			</div>
			{isLoading &&
				<Modal title='Формирование заказа' onClose={() => {}}>
					<div className={clsx(s.loading)}>
						<span className={clsx(s.loader)}></span>
					</div>
				</Modal>
			}
		</div>
	)
}