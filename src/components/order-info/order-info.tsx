import clsx from 'clsx';
import s from './order-info.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';

export function OrderInfo(){
	const params = useParams()
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	return(
		<div className={`${clsx(s.container)} ${(!state?.backgroundLocation) && clsx(s.notmodal)}`}>
			<p className="text text_type_main-medium">
				#034533
			</p>
			<div className={clsx(s.body)}>
				<div className={clsx(s.header)}>
					<p className="text text_type_main-medium">
						Black Hole Singularity острый бургер
					</p>
					<p className="text text_type_main-default">
						Выполнен
					</p>
				</div>
				<div className={clsx(s.order)}>
					<p className="text text_type_main-large">
						Состав:
					</p>
					<ul className={clsx(s.items)}>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
						<li className={clsx(s.item)}>
							<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
							<p className="text text_type_main-default">
								Флюоресцентная булка R2-D3
							</p>
							<div className={clsx(s.total)}>
								<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className={clsx(s.footer)}>
				<p className="text text_type_main-default text_color_inactive">
					Вчера, 13:50
				</p>
				<div className={clsx(s.total)}>
					<p className="text text_type_digits-default">{`${480} `}<CurrencyIcon type="primary" /></p>
				</div>
			</div>
		</div>
	)
}