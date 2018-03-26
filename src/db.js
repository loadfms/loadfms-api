export default callback => {
	// connect to a database if needed, then pass it to `callback`:

	const mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/load-api');

	callback(mongoose);
}