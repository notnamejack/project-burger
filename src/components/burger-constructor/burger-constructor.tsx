import clsx from 'clsx';
import s from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { IIngredients } from '../../data/ingredients';

interface IBurgerConstructor{
	height: number,
	selectIngredients: IIngredients[],
	price?: number,
	onDeleteIngredients: (index: string) => void
}

export function BurgerConstructor({height, selectIngredients, price, onDeleteIngredients}: IBurgerConstructor){

	const [but, setBut] = useState<IIngredients>();

	useEffect(() => {
		const find = selectIngredients.find(i => i.type === 'bun');
		if(find && find._id !== but?._id){
			setBut(find);
		}
	},[selectIngredients])

	return(
		<div className={`${clsx(s.constructor)} mt-25`}>
			<div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', gap: '10px', width: '100%' }}>
				<div style={{paddingRight: 15}}>
					{but && <ConstructorElement
						type="top"
						isLocked={true}
						text={`${but.name} (верх)`}
						price={but.price}
						thumbnail={but.image}
					/>}
				</div>
				<ul className={clsx(s.items)}
					style={{ height: height - (but ? 484 : 284) < (selectIngredients.length - (but ? 2 : 0) ) * 90 ? height - (but ? 524: 344) :'auto',
						paddingRight: height - (but ? 484 : 284) < (selectIngredients.length - (but ? 2 : 0) ) * 90 ? 0 : 15
					 }}>
					{selectIngredients.filter(i => i.type !== 'bun').map(item =>
						<li className={clsx(s.item)}>
							<DragIcon type="primary" />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								handleClose={() => onDeleteIngredients(item?.index || "")}
							/>
						</li>)
					}
				</ul>
				<div style={{paddingRight: 15}}>
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
					<Button htmlType="button" type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			}
		</div>
	)
}