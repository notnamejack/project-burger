import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import s from './profile.module.scss';
import { useAppDispatch } from '../../services/store';
import { logout } from '../../services/auth/actions';

export function Profile() {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(logout());
	};

	return (
		<div className={clsx(s.container)}>
			<nav className={clsx(s.nav)}>
				<ul>
					<li>
						<NavLink
							to={'/profile'}
							end
							className={({ isActive }) => (isActive ? clsx(s.active) : '')}>
							<span className='text text_type_main-medium text_color_inactive'>
								Профиль
							</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/profile/orders'}
							className={({ isActive }) => (isActive ? clsx(s.active) : '')}>
							<span className='text text_type_main-medium text_color_inactive'>
								История заказов
							</span>
						</NavLink>
					</li>
					<li>
						<Button
							htmlType='button'
							type='secondary'
							size='large'
							onClick={onClick}>
							Выход
						</Button>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}
