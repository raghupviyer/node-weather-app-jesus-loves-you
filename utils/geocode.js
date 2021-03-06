const request = require('postman-request');

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MB_API_KEY}&limit=1`;

	if (location.length === 0) {
		callback('Please Enter Location', undefined);
	}
	request({ url, json: true }, (err, res) => {
		if (err) {
			callback('unable to find web service', undefined);
		} else if (res.body.features.length === 0) {
			callback('Location not Found', undefined);
		} else {
			callback(undefined, {
				lattitude: res.body.features[0].center[1],
				longitude: res.body.features[0].center[0],
				location: res.body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
