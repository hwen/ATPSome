/*exports.rank = function(req, res) {
	res.sendfile('./view/rank.html');
}*/

'use strict';

module.exports = function(app) {

	app.use('/atp', require('./lib/atp'));
	app.use('/weixin', require('./lib/wechat'));

	app.route('/')
		.get(function(req, res) {
			res.sendfile('./index.html');
		});
}