const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
app.use(serve(path.resolve(__dirname, 'dist')));
app.on('error', error => console.error(error instanceof Error ? error.stack : error));
app.listen(6006);
