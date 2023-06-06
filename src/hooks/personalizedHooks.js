/* 
	1-useLoading 			=> hook que permite renderizar un elemento mientras carga otro
	2-useLoadOnGlblState	=> hook que permite cargar datos al estado global al montarse el componente 
*/

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoading = (action, actionParam = null) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);

		const fetch = async () => {
			await dispatch(action(actionParam));
			setLoading(false);
		};

		fetch();
	}, [actionParam, dispatch]);

	return loading;
};

export const useLoadOnGlblState = (globalState, action, actionParam = null) => {
	if (typeof globalState !== 'string')
		throw new Error(
			`First argument Must Be a string, instead of: ${typeof globalState} and it references to a global state`
		);

	const glblState = useSelector((state) => state[globalState]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action(actionParam));
	}, []);

	return glblState;
};
