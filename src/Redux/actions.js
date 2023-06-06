import {
	GET_RECIPES,
	GET_RECIPE_NAME,
	GET_RECIPE_DETAIL,
	FILTER_BY_DIET,
	ORDER_BY_NAME,
	ORDER_BY_HEALTHSCORE,
	GET_DIETS,
	ADD_RECIPE,
	FILTER_BY_ORIGIN,
	TOGGLE_DARK_MODE,
} from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:3001';

// action que obtiene todas las recetas
export const getRecipes = () => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}/recipes`);

		return dispatch({
			type: GET_RECIPES,
			payload: response.data,
		});
	};
};

// Obtener las recetas por nombre
export const getRecipeName = (name) => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}/recipes?name=${name}`);

		return dispatch({
			type: GET_RECIPE_NAME,
			payload: response.data,
		});
	};
};

export const recipeDetail = (detailId) => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}/recipes/${detailId}`);
		return dispatch({
			type: GET_RECIPE_DETAIL,
			payload: response.data,
		});
	};
};

export const filterByDiet = (diet) => {
	return async (dispatch) => {
		return dispatch({
			type: FILTER_BY_DIET,
			payload: diet,
		});
	};
};

export const orderByName = (order) => {
	return {
		type: ORDER_BY_NAME,
		payload: order,
	};
};

export const orderByHealthScore = (order) => {
	return {
		type: ORDER_BY_HEALTHSCORE,
		payload: order,
	};
};

export const getDiets = () => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}/diets`);
		return dispatch({
			type: GET_DIETS,
			payload: response.data,
		});
	};
};

export const addRecipe = (form) => {
	return async (dispatch) => {
		const response = await axios.post(`${URL}/recipes`, form);
		return dispatch({
			type: ADD_RECIPE,
			payload: response.data,
		});
	};
};

export const filterByOrigin = (origin) => {
	return async (dispatch) => {
		return dispatch({
			type: FILTER_BY_ORIGIN,
			payload: origin,
		});
	};
};

export const toggleDarkMode = () => {
	return {
		type: TOGGLE_DARK_MODE,
	};
};
