const { Worker } = require("worker_threads");
const fs = require('fs');
const cpuCount = require('os').cpus().length;
const halfCpuCount = Math.ceil(cpuCount / 2);
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname + "/../data/", 'data.json')));
const splitted_data = Math.ceil(data.length / halfCpuCount);


function createWorker(data) {

  return new Promise(function (resolve, reject) {
    const worker = new Worker(path.join(__dirname + "/pending_debts.js"), {
      workerData: { data: data.data, index: data.index },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (msg) => {
      reject(`An error ocurred: ${msg}`);
    });
  });
}



async function multi_threaded_process() {

  console.time('addPendingDebts')
  console.log(data.length);

  // generate workers
  const workerPromises = [];
  for (let i = 0; i < halfCpuCount; i++) {
    // create a worker for each splitted data
    const workerData = {
      data: data.slice(i * splitted_data, (i + 1) * splitted_data),
      index: i
    };

    workerPromises.push(createWorker(workerData));
  }

  const thread_results = await Promise.all(workerPromises);
  const dataWithPendingDebts = thread_results.flat();
  console.timeEnd('addPendingDebts')
  console.log(dataWithPendingDebts.length);
  fs.writeFileSync(path.join(__dirname + "/../data", 'dataWithPendingDebts.json'), JSON.stringify(dataWithPendingDebts));
}

module.exports = { multi_threaded_process };

