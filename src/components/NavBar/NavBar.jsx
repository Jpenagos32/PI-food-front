import styles from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByDiet,
	filterByOrigin,
	getDiets,
	orderByHealthScore,
	orderByName,
	toggleDarkMode,
} from '../../Redux/actions';
import { useLoadOnGlblState } from '../../hooks/personalizedHooks';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	const dispatch = useDispatch();

	const darkMode = useSelector((state) => state.darkMode);

	// Hook personalizado
	const diets = useLoadOnGlblState('allDiets', getDiets);

	const handleFilter = (event) => {
		dispatch(filterByDiet(event.target.value));
	};

	const handleOrder = (event) => {
		dispatch(orderByName(event.target.value));
	};

	const handleOrderHealthScore = (event) => {
		dispatch(orderByHealthScore(event.target.value));
	};

	const handleFilterOrigin = (event) => {
		dispatch(filterByOrigin(event.target.value));
	};

	const handleClick = (event) => {
		event.preventDefault();
		dispatch(toggleDarkMode());
	};
	return (
		<div className={styles.container}>
			<button onClick={handleClick}>
				Toggle {darkMode ? 'Light Mode' : 'Dark Mode'}
			</button>
			<Link to='/form'>
				<button>Create Recipe</button>
			</Link>

			<div className={styles.filterSelect}>
				<label htmlFor='filterSelect'>Filter By Diets</label>
				<select
					defaultValue='--Select--'
					onChange={handleFilter}
					name='filter'
					id='filterSelect'
				>
					<option disabled>--Select--</option>
					<option value='NF'>No Filter</option>
					{diets?.map((diet, index) => {
						return (
							<option key={index} value={diet.name}>
								{diet.name}
							</option>
						);
					})}
				</select>
			</div>

			<div className={styles.origin}>
				<label htmlFor='origin'>Filter By Origin</label>
				<select
					name='origin'
					id='origin'
					defaultValue='--Select--'
					onChange={handleFilterOrigin}
				>
					<option disabled>--Select--</option>
					<option value='NF'>No Filter</option>
					<option value='API'>API</option>
					<option value='DB'>Data Base</option>
				</select>
			</div>

			<div className={styles.orderSelect}>
				<label htmlFor='orderSelect'>Order By Name</label>
				<select
					onChange={handleOrder}
					name='orderSelect'
					id='orderSelect'
					defaultValue='--Select--'
				>
					<option disabled>--Select--</option>
					{/* <option value='N'>None</option> */}
					<option value='A'>A - Z</option>
					<option value='D'>Z - A</option>
				</select>
			</div>

			<div>
				<label htmlFor='orderHealthScore'>Order By Health Score</label>
				<select
					onChange={handleOrderHealthScore}
					name='orderHealthScore'
					id='orderHealthScore'
					defaultValue='--Select--'
				>
					<option disabled>--Select--</option>
					{/* <option value='N'>None</option> */}
					<option value='A'>0 - 100</option>
					<option value='D'>100 - 0</option>
				</select>
			</div>

			<SearchBar />
		</div>
	);
};
export default NavBar;
