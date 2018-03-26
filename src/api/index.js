import { version } from '../../package.json';
import { Router } from 'express';
import devices from './devices';

export default ({ config, db }) => {
	let api = Router();
	
	//devices
	api.use('/devices', devices({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
