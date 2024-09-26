
import clsx from 'clsx';
import s from './app-header.module.scss';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { getUser } from '../../services/auth/reducer';
import { useAppSelector } from '../../services/store';

export function AppHeader (){

	const user = useAppSelector(getUser);

	return (
		<header className={clsx(s.header)}>
			<div className={clsx(s.nav)}>
				<nav className={clsx(s.left)}>
					<ul className={clsx(s.items)}>
						<li className={`${clsx(s.item)} pl-5 pr-5 pb-5 pt-5`}>
							{/* сделал <a></a> чтоб потом на линк поменять, чтоб между страницами переключать */}
							<NavLink to={'/'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
								<BurgerIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Конструктор</span>
							</NavLink>
						</li>
						<li className={clsx(s.item)}>
							<NavLink to={'/order'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
								<ListIcon type="secondary" />
								<span className='text text_type_main-default text_color_inactive'>Лента заказов</span>
							</NavLink>
						</li>
					</ul>
				</nav>
				<Link to={'/'} className={clsx(s.logo)}>
					<Logo />
				</Link>
				<div className={`${clsx(s.in)} pl-5 pr-5 pb-5 pt-5`}>
					<NavLink to={'/profile'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
						<ProfileIcon type="secondary" />
						<span className='text text_type_main-default text_color_inactive'>{!user ? 'Личный кабинет' : user.name}</span>
					</NavLink>
				</div>
			</div>
		</header>
	)
}