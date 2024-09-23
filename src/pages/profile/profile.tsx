import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from 'clsx';
import s from './profile.module.scss';
import { ProfileUser } from "../../components";
import { useAppDispatch } from "../../services/store";
import { logout } from "../../services/auth/actions";

const pathDefault = '/profile'

export function Profile(){
	const { pathname } = useLocation();
    const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(logout());
	}

	return(
		<div className={clsx(s.container)}>
			<nav className={clsx(s.nav)}>
				<ul>
					<li>
						<NavLink to={'/profile'} end className={({isActive}) => isActive ? clsx(s.active) : ''}>
							<span className='text text_type_main-medium text_color_inactive'>Профиль</span>
						</NavLink>
					</li>
					<li>
						<NavLink to={'/profile/orders'} className={({isActive}) => isActive ? clsx(s.active) : ''}>
							<span className='text text_type_main-medium text_color_inactive'>История заказов</span>
						</NavLink>
					</li>
					<li>
					<Button htmlType="button" type="secondary" size="large" onClick={onClick}>
						Выход
					</Button>
					</li>
				</ul>
			</nav>
			<div>
				{pathname === pathDefault
				? <ProfileUser/>
				:<Outlet/>}
			</div>
		</div>
	)
}