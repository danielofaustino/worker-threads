const fs = require('fs');


async function addPendingDebts(data) {
  // add new pending_debts field to each record and to simulate a async request http set a 3 seconds timeout wihtou paralelism
console.time('addPendingDebts')

  try {
    const dataWithPendingDebts = [];

    for (let i = 0; i < data.length; i++) {


      const pending_debts = Math.floor(Math.random() * (10000 - 1000) + 1000);
      dataWithPendingDebts.push({ ...data[i], pending_debts });
      // print the actual index and how much items are left
      console.log(`Index: ${i} - Left: ${data.length - i}`);
      await new Promise(resolve => setTimeout(resolve, 10));


    }
    console.timeEnd('addPendingDebts')
    return dataWithPendingDebts;
  } catch (error) {
    console.log(error)
    return error

  }


}

async function main() {

  // import data.json and insert a new field called pending_debts and insert a random number between 1000 and 10000

  const data = JSON.parse(fs.readFileSync('data.json'));

  const dataWithPendingDebts = await addPendingDebts(data);
  // insert the new data in a file called "dataWithPendingDebts.json"
  // the file must be saved in the same folder as the index.js file

  fs.writeFileSync('dataWithPendingDebts.json', JSON.stringify(dataWithPendingDebts));
  console.log(dataWithPendingDebts);

}


main()