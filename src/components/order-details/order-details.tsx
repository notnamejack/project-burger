
import clsx from 'clsx';
import s from './order-details.module.scss';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DoneBack from '../../images/done_back.svg'

export function OrderDetails (){
	return (
		<div className={clsx(s.container)}>
			<div className={clsx(s.number)}>
				<p className={`${clsx(s.order)} text text_type_digits-large`}>034536</p>
				<p className="text text_type_main-medium">идентификатор заказа</p>
			</div>
			<div className={clsx(s.image)}>
				<img src={DoneBack}/>
				<div className={clsx(s.icon)}>
					<CheckMarkIcon type="primary" />
				</div>
			</div>
			<div className={clsx(s.status)}>
				<p className="text text_type_main-default">Ваш заказ начали готовить</p>
				<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
			</div>
		</div>
	)
}