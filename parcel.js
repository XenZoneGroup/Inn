const Bundler = require('parcel-bundler');
const chalk = require('chalk');
const express = require('express');
const app = express();

const port = 1234;

const LOCAL_CONFIG = {
  apiRoot: 'https://api-dev-test.kooth.com',
  frontendRoot: `http://localhost:${port}`,
  userProfileEndpoint: 'https://api-dev-test.xenzonegroup.com/service-users/me',
};

const bundler = new Bundler('./index.html', {
  publicUrl: '/SOME_PARTNER/sign-up',
});

app.get('/SOME_PARTNER/config.json', (req, res) => {
  res.type('json');
  res.send(LOCAL_CONFIG);
});
app.get('/not-found.json', (req, res) => {
  res.sendStatus(404);
});

app.use(bundler.middleware());

Promise.all([
  new Promise(res => app.listen(port, res)),
  new Promise(res => bundler.on('bundled', res)),
]).then(() => {
  console.log(
    `Server running at ${chalk.bold(chalk.cyan('http://localhost:1234'))}`
  );
});
