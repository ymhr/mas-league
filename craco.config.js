const path = require('path');

module.exports = function({ env, paths }) {
	console.log(env, paths);
	return {
		webpack: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		}
	};
};

// module.export = {
// 	webpack: {
// 		alias: {
// 			'@': path.resolve(__dirname, 'src')
// 		},
// 		configure: (webpackConfig, { env, paths }) => {
// 			console.log(webpackConfig);
// 			return webpackConfig;
// 		}
// 	}
// };
