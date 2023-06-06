// import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import { useSelector } from 'react-redux';
import axios from 'axios';

function App() {
	// axios.defaults.baseURL = 'http://localhost:3001';
	axios.defaults.baseURL =
		'https://pi-food-back-production-b752.up.railway.app';
	/* 
  ! Esta es la funcion que cambia entre dark y light
	const [darkMode, setDarkMode] = useState(false);

	const darkModeHandler = () => {
		setDarkMode(!darkMode);
	};

TODO suscribir este componente al estado global darkMode	
 */

	const darkMode = useSelector((state) => state.darkMode);

	const location = useLocation();
	return (
		// TODO si es false el darkMode que classname sea lightMode de lo contrario que sea darkMode
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			{location.pathname !== '/' && <NavBar />}

			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/form' element={<CreateRecipe />} />
			</Routes>
		</div>
	);
}

export default App;
