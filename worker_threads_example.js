const { Worker } = require("worker_threads");
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json'));
const cpuCount = require('os').cpus().length;
const halfCpuCount = Math.ceil(cpuCount / 2);
const splitted_data = Math.ceil(data.length / halfCpuCount);

function createWorker(data) {

  return new Promise(function (resolve, reject) {
    const worker = new Worker("./pending_debts.js", {
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



async function main() {

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
  fs.writeFileSync('dataWithPendingDebts.json', JSON.stringify(dataWithPendingDebts));
}

main()

