import styles from './LandingPage.module.css';
import LandingBg from '../../images/landing/LandingBg.jpg';
import { Link } from 'react-router-dom';

const LandingPage = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.txt}>
				<h1>WELCOME</h1>
				<h2>Henry Foods</h2>
				<Link to='/home'>
					<button>Get Started</button>
				</Link>
			</div>
			<img src={LandingBg} alt='Dishes' className={styles.lndngBg} />
		</div>
	);
};
export default LandingPage;
