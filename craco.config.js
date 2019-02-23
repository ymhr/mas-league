const path = require('path');
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

module.exports = function({ env, paths }) {
	return {
		webpack: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		plugins: [{ plugin: reactHotReloadPlugin }]
	};
};
