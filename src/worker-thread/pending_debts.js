const { workerData, parentPort } = require("worker_threads");

async function processData() {
  try {

    const dataWithPendingDebts = [];

    const { data, index } = workerData;

    for (let i = 0; i < data.length; i++) {
      const pending_debts = Math.floor(Math.random() * (10000 - 1000) + 1000);
      dataWithPendingDebts.push({ ...data[i], pending_debts });
      console.log(`WorkerIndex: ${index} Index: ${i} - Left: ${data.length - i}`);
      await new Promise(resolve => setTimeout(resolve, 1));
    }

    parentPort.postMessage(dataWithPendingDebts);
  } catch (error) {
    console.log(error)
    parentPort.postMessage(error);
  }
}

processData();