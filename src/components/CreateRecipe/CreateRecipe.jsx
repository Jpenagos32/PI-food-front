import styles from './CreateRecipe.module.css';
import { getDiets } from '../../Redux/actions';
import { useLoadOnGlblState } from '../../hooks/personalizedHooks';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateForm } from '../../functions';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../../Redux/actions';

const CreateRecipe = (props) => {
	// Hook personalizado
	// const allDiets = useLoadOnGlblState('allDiets', getDiets);
	const allDiets = useSelector((state) => state.allDiets);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		title: '',
		image: '',
		summary: '',
		healthScore: '',
		steps: [],
		diets: [],
		numSteps: 0,
	});

	const [errors, setErrors] = useState({
		title: '',
		image: '',
		summary: '',
		healthScore: '',
		steps: '',
		diets: '',
	});

	const [stepDescription, setStepDescription] = useState('');

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [property]: value });

		validateForm({ ...form, [property]: value }, setErrors, errors);
	};

	const clearForm = (event) => {
		event.preventDefault();
		setForm({
			title: '',
			image: '',
			summary: '',
			healthScore: '',
			steps: [],
			diets: [],
			numSteps: 0,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addRecipe(form)).then(() => {
			navigate('/home');
		});

		alert('Your Recipe Has Been Created Successfully');

		setForm({
			title: '',
			image: '',
			summary: '',
			healthScore: '',
			steps: [],
			diets: [],
			numSteps: 0,
		});
	};

	const handleChangeSteps = (event) => {
		setStepDescription(event.target.value);
	};

	const handleStep = (event) => {
		event.preventDefault();
		if (stepDescription !== '') {
			setForm({
				...form,
				steps: [
					...form.steps,
					{ number: form.numSteps + 1, step: stepDescription },
				],
				numSteps: form.numSteps + 1,
			});
			setStepDescription('');
		} else {
			alert('Please Put a Step');
		}
	};

	const handleDelete = (event) => {
		event.preventDefault();
		setForm({
			...form,
			steps: [],
		});
	};

	const changeHandler = (event) => {
		const value = event.target.value;

		setForm({ ...form, diets: [...form.diets, value] });
	};

	return (
		<div>
			<div className='invisible'></div>
			<Link to='/home'>
				<button>Home</button>
			</Link>
			<h1>CREATE NEW RECIPE</h1>
			<div className={`${styles.frm}`}>
				<form onSubmit={handleSubmit}>
					<div className={`${styles.inpt}`}>
						<label htmlFor='title'>Recipe Name</label>
						<input
							type='text'
							id='title'
							name='title'
							value={form.title}
							onChange={handleChange}
						/>
						<span>{errors.title}</span>
					</div>

					<div className={`${styles.inpt}`}>
						<label htmlFor='image'>Image Link</label>

						<input
							type='text'
							id='image'
							name='image'
							onChange={handleChange}
							value={form.image}
						/>
						<span>{errors.image}</span>
					</div>

					<div className={`${styles.inpt}`}>
						<label htmlFor='summary'>Recipe Summary: </label>

						<textarea
							name='summary'
							id='summary'
							cols='40'
							rows='5'
							value={form.summary}
							onChange={handleChange}
						></textarea>
						<span>{errors.summary}</span>
					</div>

					<div className={`${styles.inpt}`}>
						<label htmlFor='healthScore'>Health Score:</label>

						<input
							type='number'
							id='healthScore'
							name='healthScore'
							value={form.healthScore}
							onChange={handleChange}
						/>
						<span>{errors.healthScore}</span>
					</div>

					<div className={`${styles.inpt}`}>
						<label htmlFor='steps'>Step By Step</label>

						<textarea
							name='steps'
							id='steps'
							cols='40'
							rows='5'
							value={stepDescription}
							onChange={handleChangeSteps}
						></textarea>
						<div>
							<button
								onClick={handleStep}
								className={styles.btnx}
							>
								Add
							</button>
							<button
								className={styles.btnx}
								onClick={handleDelete}
							>
								Clean
							</button>
						</div>
						<ul>
							{form.steps.map((step, index) => {
								return (
									<p key={index}>
										<strong>Step {step.number}:</strong>{' '}
										{step.step}
									</p>
								);
							})}
						</ul>
					</div>

					<div className={`${styles.inpt}`}>
						<label htmlFor='diets'>Diet Type:</label>

						<select
							name='diets'
							id='diets'
							onChange={changeHandler}
						>
							{allDiets?.map((diet, index) => {
								return (
									<option value={diet.name}>
										{diet.name}
									</option>
								);
							})}
						</select>
					</div>

					<div className={`${styles.inpt}`}>
						<button
							disabled={
								form.title &&
								form.image &&
								form.summary &&
								form.healthScore &&
								form.steps &&
								form.diets &&
								!(
									errors.title &&
									errors.image &&
									errors.summary &&
									errors.healthScore &&
									errors.steps &&
									errors.diets
								)
									? false
									: true
							}
							type='submit'
						>
							Save
						</button>
						<button onClick={clearForm}>Clear Form</button>
					</div>
				</form>
			</div>
			<div className='invisible'></div>
			<div className='invisible'></div>
		</div>
	);
};
export default CreateRecipe;
