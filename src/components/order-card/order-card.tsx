import clsx from 'clsx';
import s from './order-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderCard({onClick}:{onClick?: () => void}){
	return(
		<div className={clsx(s.container)} onClick={onClick}>
			<div className={clsx(s.header)}>
			<p className="text text_type_digits-default">{`#${'034535'}`}</p>
			<p className="text text_type_main-default text_color_inactive">
				Сегодня, 16:20
			</p>
			</div>
			<div>
			<p className="text text_type_main-medium">
				Death Star Starship Main бургер
			</p>
			{/* <p className="text text_type_main-small">
				Создан
			</p> */}
			</div>
			<div className={clsx(s.body)}>
				<ul className={clsx(s.items)}>
					<li className={clsx(s.item, s.other)}>
						<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
						<span>
							<p className="text text_type_digits-default">+3</p>
						</span>
					</li>
					<li className={clsx(s.item)}>
						<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
					</li>
					<li className={clsx(s.item)}>
						<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
					</li>
					<li className={clsx(s.item)}>
						<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
					</li>
				</ul>
				<div className={clsx(s.total)}>
					<p className="text text_type_digits-default">{`${480} `}<CurrencyIcon type="primary" /></p>
				</div>
			</div>
		</div>
	)
}