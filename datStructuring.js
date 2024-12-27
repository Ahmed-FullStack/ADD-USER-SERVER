exports.getData = function () {
	return new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: '2-digit',
	});
};
