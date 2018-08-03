const db = require('../../src/db');
const {tick} = require('../../src/models/tick');

const dataTick = db.models.get('data');
const Products = [];

const addExchange = function(name,product) {
  const ex = getExchange(name,product);
  if (ex != undefined ) {
    ex.on('tick', tickdata => {
      console.log(tickdata);
      dataTick.create(tick(tickdata));
    });
    Products.push(ex);
  }
}

const getExchange = function(name, product) {
  try {
    var req = require ('./'+ name +'.js');
    var ex = new req(product);
    return ex;
  } catch (ex) {
      return undefined;
  }
};

module.exports = {addExchange};

//
// function addProduct(exchange, product) {
//
//
//
//   var chart = new Chart({product}).start();
//   chart.on('close', candle => {
//     candle.exchange = exchange;
//     // dataTick.create(tick(candle));
//     getDbData(exchange, product, 3);
//   });
//   chart.on('error', err => console.log(err));
//   Products.push(chart);
// };
//
// function getDbData(exchange, product,  count) {
//   dataTick.findAll({
//     raw: true,
//     attributes: ['product', 'createdAt', 'price'],
//     where: {
//       exchange: exchange,
//       product: product,
//       // timeframe: '5s'
//     },
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     limit: count
//   }).then((data) => {
//       console.log(data)
//       // parsing Date (timestamp) from sequelize fails
//       // var obj = JSON.parse(data);
//       // console.log(obj.last)
//   }).catch((err) => {
//       console.log(`Error: ${err}`)
//   })
