const express = require('express');
const v8 = require('v8');
const pms_package = require('../package.json');
const { multi_threaded_process } = require('./worker-thread/multi-threaded.js');
const { single_threaded_process } = require('./single-threaded');


const app = express();
app.use(express.json());

let countGet = 0;

app.get('/', function (req, res) {
  countGet++;

  const memoryUsage = process.memoryUsage();
  const heapStats = v8.getHeapStatistics();

  var sysData = {
    dataTime: new Date().toISOString(),
    count: countGet,
    pms_version: pms_package.version,
    pms_name: pms_package.name,
    memoryUsage: {
      rss: (memoryUsage.rss / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      heapTotal: (memoryUsage.heapTotal / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      heapUsed: (memoryUsage.heapUsed / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      external: (memoryUsage.external / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      arrayBuffers: (memoryUsage.arrayBuffers / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      heapLimit: `${heapStats.heap_size_limit / 1024 / 1024} MB`
    }
  };
  res.status(200);
  res.json(sysData);
});


app.get('/multi-threaded', function (req, res) {
  multi_threaded_process()
  res.status(200);
});

app.get('/single-threaded', function (req, res) {
  single_threaded_process().then(() => {
    res.status(200);
  });
}
);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


