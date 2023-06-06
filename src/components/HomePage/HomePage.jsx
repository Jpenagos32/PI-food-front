import Cards from '../Cards/Cards';
import styles from './HomePage.module.css';

const HomePage = (props) => {
	return (
		<div className={styles.container}>
			<Cards />
		</div>
	);
};
export default HomePage;
