const notBlankText = 'This Field Can Not Be Blank';
const notSpecialChars = 'This Field Can Not Contain Special Characters';
const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{}'\\|<>/]/;
const regexUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
const numberRegex = /^[0-9]+$/;

// Funcion que valida un input que debe contener una URL

export const validateForm = (form, setErrors, errors) => {
	// ? Validaciones de Recipe Name
	if (!form.title) {
		setErrors({
			...errors,
			title: notBlankText,
		});
	} else if (form.title.length <= 3 || form.title.length > 60) {
		setErrors({
			...errors,
			title: 'Length Must Be Between 4 and 60 Characters',
		});
	} else if (specialCharsRegex.test(form.title)) {
		setErrors({ ...errors, title: notSpecialChars });
	} else if (!form.image) {
		setErrors({ ...errors, image: notBlankText, title: '' });
	} else if (!regexUrl.test(form.image)) {
		setErrors({
			...errors,
			image: 'Must Be a Valid URL',
			title: '',
		});
	} else if (!form.summary) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: notBlankText,
		});
	} else if (specialCharsRegex.test(form.summary)) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: notSpecialChars,
		});
	} else if (form.summary.length < 40) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: 'Length Must Exceed 40 Characters',
		});
	} else if (!form.healthScore) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: '',
			healthScore: notBlankText,
		});
	} else if (!numberRegex.test(form.healthScore)) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: '',
			healthScore: 'Must Be A Number Between 0 And 100',
		});
	} else if (form.healthScore > 100 || form.healthScore < 0) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: '',
			healthScore: 'Must Be A Number Between 0 And 100',
		});
	} else if (!form.diets) {
		setErrors({
			...errors,
			title: '',
			image: '',
			summary: '',
			healthScore: '',
			steps: '',
			diets: 'Please Select One Option',
		});
	} else {
		setErrors({
			title: '',
			image: '',
			summary: '',
			healthScore: '',
			diets: '',
		});
	}
};
