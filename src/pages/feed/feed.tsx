import clsx from 'clsx';
import s from './feed.module.scss';
import { OrderCard } from '../../components';

export function Feed(){
	return(
		<div className={clsx(s.container)}>
			<p className="text text_type_main-large mb-5 mt-10">
				Лента заказов
			</p>
			<div className={clsx(s.body)}>
				<div className={clsx(s.orders)}>
					<OrderCard/>
					<OrderCard/>
					<OrderCard/>
					<OrderCard/>
				</div>
				<div className={clsx(s.panel)}>
					<div className={clsx(s.work)}>
						<div className={clsx(s.list)}>
							<p className="text text_type_main-medium mb-6">
								Готовы:
							</p>
							<ul>
								<li>
									<p className="text text_type_digits-default">034533</p>
								</li>
								<li>
									<p className="text text_type_digits-default">034533</p>
								</li>
							</ul>
						</div>
						<div className={clsx(s.list)}>
							<p className="text text_type_main-medium mb-6">
								В работе:
							</p>
							<ul>
								<li>
									<p className="text text_type_digits-default">034533</p>
								</li>
								<li>
									<p className="text text_type_digits-default">034533</p>
								</li>
							</ul>
						</div>
					</div>
					<div className={clsx(s.history)}>
						<div>
							<p className="text text_type_main-medium">
								Выполнено за все время:
							</p>
							<p className="text text_type_digits-large">28 752</p>
						</div>
						<div>
							<p className="text text_type_main-medium">
								Выполнено за сегодня:
							</p>
							<p className="text text_type_digits-large">138</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}