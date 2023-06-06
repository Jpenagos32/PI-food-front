import Card from '../Card/Card';
import style from './Cards.module.css';
import { useSelector } from 'react-redux';
import { getRecipes } from '../../Redux/actions';
import { useLoading } from '../../hooks/personalizedHooks';
import loadingGif from '../../images/Detail/loading.gif';
import { useState } from 'react';

const Cards = (props) => {
	const allRecipes = useSelector((state) => state.recipes);

	// Lógica para crear el páginado
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const visibleItems = allRecipes.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(allRecipes.length / itemsPerPage);

	const pageNumber = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumber.push(i);
	}

	// Hook para pantalla de carga
	const loading = useLoading(getRecipes);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className={style.page}>
			<div className='invisible'></div>
			<div className={style.pagination}>
				<input
					type='button'
					onClick={prevPage}
					disabled={currentPage === 1}
					value='Prev'
				/>

				{pageNumber?.map((pagNum) => {
					return (
						<input
							type='button'
							value={pagNum}
							key={pagNum}
							onClick={() => handlePageChange(pagNum)}
						/>
					);
				})}

				<input
					type='button'
					disabled={currentPage >= totalPages}
					onClick={nextPage}
					value='Next'
				/>
			</div>
			<p>
				Page: {currentPage} of {totalPages}
			</p>
			{loading ? (
				// <div className={style.loading}>
				// 	<img src={loadingGif} alt='Loading...' />
				// </div>
				<span className={style.loader}></span>
			) : (
				<div className={style.container}>
					{visibleItems?.map((recipe, index) => {
						return (
							<Card
								key={index}
								img={recipe.image}
								name={recipe.title}
								diets={recipe.diets}
								id={recipe.id}
								healthScore={recipe.healthScore}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
export default Cards;
