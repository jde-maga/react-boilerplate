/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   express.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jde-maga <jde-maga@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/09/01 15:17:07 by Julien de M       #+#    #+#             */
/*   Updated: 2017/11/08 01:14:28 by jde-maga         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./logger.js');

const app = express();

/**
 * Hot reload configuration
 */

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));
/* eslint-enable import/no-extraneous-dependencies */

app.set('showStackError', true);
app.set('root', '/');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  type: '*/*',
}));
app.use('/', require('./routes.js'));

const server = app.listen(8080, () => {
  logger.info('node', 'Started server on port 8080');
});

server.on('error', (error) => {
  logger.error('node', error);
});

module.exports = server;
