// import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import { useSelector } from 'react-redux';

function App() {
	const darkMode = useSelector((state) => state.darkMode);

	const location = useLocation();
	return (
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
