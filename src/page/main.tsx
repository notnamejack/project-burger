import { useEffect, useState } from "react";
import clsx from 'clsx';
import s from './main.module.scss';
import {BurgerConstructor, BurgerIngredients, IngredientDetails, Modal} from '../components'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { closeModal } from "../services/ingredients-details-splice/reducer";

export function Main (){

	const [height, setHeight] = useState(window.document.documentElement.clientHeight);
	const item = useSelector((state: RootState) => state.ingredientsDetails.item);
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener("resize", trackMousePos)
		return () => {
			window.removeEventListener("resize", trackMousePos)
		}
	  },[])

	const trackMousePos = () => {
		setHeight(window.document.documentElement.clientHeight);
	};

	return(
		<div className={clsx(s.container)}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients height={height}/>
				<BurgerConstructor height={height}/>
			</DndProvider>
			{item &&
				<Modal title='Детали ингредиента' onClose={() => dispatch(closeModal())}>
					<IngredientDetails/>
				</Modal>
			}
		</div>
	)
}