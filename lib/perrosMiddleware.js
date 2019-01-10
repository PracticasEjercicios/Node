module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;

		if (!nombre) res.send('Falta el nombre.');
		if (!edad) res.send('Falta la edad.');
		if (!vacunas) res.send('Faltan las vacunas.');

		const { tetanos, rabia } = vacunas;

		if (!tetanos) res.send('Falta la vacuna del tetanos.');
		if (!rabia) res.send('Falta la vacuna de la rabia.');

		next();
	};

	const datosPrimitivos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;

		if (typeof(nombre) != 'string') res.send('El nombre debe de ser texto.');
		if (typeof(edad) != 'number') res.send('La edad debe de ser número.');

		if (typeof(vacunas.tetanos) != 'string') res.send('Tetanos debe de ser texto.');
		if (typeof(vacunas.rabia) != 'string') res.send('Rabia debe de ser texto.');

		next();
	};

	const datosValidos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;

		if (nombre.trim().length > 30) res.send('Máximo 30 cáracteres.');
		if (edad < 0 || edad > 30) res.send('Edad entre 0 y 30.');

		validarFecha(vacunas.tetanos, res);
		validarFecha(vacunas.rabia, res);

		next();
	};

	const validarFecha = (fecha, res) => {
		if (fecha.length != 8) res.send('Falta fecha en formato DDMMAAAA');
		if (isNaN(parseInt(fecha))) res.send('Fecha debe ser númerico');

		let anio = fecha.substring(4);
		let mes = parseInt(fecha.substring(2, 4)) - 1;
		let dia = fecha.substring(0, 2);
		let fecha_dada = new Date(anio, mes, dia);
		if (fecha_dada > new Date()) res.send('Fecha del futuro no se puede.');
		if (!(fecha_dada instanceof Date)) res.send('Fecha inválida.');
	};

	return {
		datosCompletos,
		datosPrimitivos,
		datosValidos
	}
})();