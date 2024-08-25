
import clsx from 'clsx';
import s from './app-header.module.scss';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader (){
	return (
		<header className={clsx(s.header)}>
			<div className={clsx(s.nav)}>
				<nav className={clsx(s.left)}>
					<ul className={clsx(s.items)}>
						<li className={clsx(s.item)}>
							<a>
								<BurgerIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Конструктор</span>
							</a>
						</li>
						<li className={clsx(s.item)}>
							<a>
								<ListIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Лента заказов</span>
							</a>
						</li>
					</ul>
				</nav>
				<div className={clsx(s.logo)}>
					<Logo />
				</div>
				<div className={clsx(s.in)}>
					<a>
						<ProfileIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive'>Личный кабинет</span>
					</a>
				</div>
			</div>
		</header>
	)
}