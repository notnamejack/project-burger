import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './app/store';


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	//в дев можно убрать двойное монтирование апп, если удалить
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
