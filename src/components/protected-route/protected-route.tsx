import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/auth/reducer';
import { useAppSelector } from '../../services/store';

const Protected = ({
	onlyUnAuth = false,
	resetPasswor = false,
	component,
}: {
	onlyUnAuth?: boolean;
	resetPasswor?: boolean;
	component: React.ReactNode;
}) => {
	const isAuthChecked = useAppSelector(getIsAuthChecked);
	const user = useAppSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Загрузка...</p>;
	}

	if (!onlyUnAuth && !user && !resetPasswor) {
		// для авторизованного, но неавторизован
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// для неавторизованного, но авторизован
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (resetPasswor && !localStorage.getItem('resetPassword')) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.ReactNode }) => (
	<Protected onlyUnAuth={true} component={component} />
);

export const OnlyReset = ({ component }: { component: React.ReactNode }) => (
	<Protected resetPasswor={true} component={component} />
);
