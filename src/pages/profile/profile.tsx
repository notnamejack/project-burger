import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet } from "react-router-dom";
import clsx from 'clsx';
import s from './profile.module.scss';

export function Profile(){
	return(
		<div className={clsx(s.container)}>
			<nav className={clsx(s.nav)}>
				<ul>
					<li>
						<NavLink to={'/profile'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
							<span className='text text_type_main-medium text_color_inactive'>Профиль</span>
						</NavLink>
					</li>
					<li>
						<NavLink to={'/profile/orders'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
							<span className='text text_type_main-medium text_color_inactive'>История заказов</span>
						</NavLink>
					</li>
					<li>
					<Button htmlType="button" type="secondary" size="large">
						Выход
					</Button>
					</li>
				</ul>
			</nav>
			<div>
				<Outlet/>
			</div>
		</div>
	)
}