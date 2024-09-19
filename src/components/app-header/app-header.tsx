
import clsx from 'clsx';
import s from './app-header.module.scss';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { isAction } from 'redux';

export function AppHeader (){
	return (
		<header className={clsx(s.header)}>
			<div className={clsx(s.nav)}>
				<nav className={clsx(s.left)}>
					<ul className={clsx(s.items)}>
						<li className={`${clsx(s.item)} pl-5 pr-5 pb-5 pt-5`}>
							{/* сделал <a></a> чтоб потом на линк поменять, чтоб между страницами переключать */}
							<NavLink to={'/'} >
								<BurgerIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Конструктор</span>
							</NavLink>
						</li>
						<li className={clsx(s.item)}>
							<NavLink to={'/'} >
								<ListIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Лента заказов</span>
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className={clsx(s.logo)}>
					<Logo />
				</div>
				<div className={`${clsx(s.in)} pl-5 pr-5 pb-5 pt-5`}>
					<a>
						<ProfileIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive'>Личный кабинет</span>
					</a>
				</div>
			</div>
		</header>
	)
}