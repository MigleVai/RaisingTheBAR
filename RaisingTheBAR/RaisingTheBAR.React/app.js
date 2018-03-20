const express = require('express');
const opn = require('opn');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.listen(port, () => {
    ls();
    console.log(`Listening on port ${port}`);
});
async function ls() {
    const { stdout, stderr } = await exec('yarn client');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}