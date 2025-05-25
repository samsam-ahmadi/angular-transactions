const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'http://localhost:8090',
  'http://127.0.0.1:8090',
  'https://angular-transactions.onrender.com/api/transactions',
  'https://samsam-ahmadi.github.io/angular-transactions',
  'https://killthejs.com',
]

app.use(cors({
  origin: function (origin: any, callback: any) {

    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.get('/', (req: any, res: any) => {
  console.log(req.body);
  console.log('status success');
  res.send('OK');
});

app.get('/api/transactions', (req: any, res: any) => {
  res.send(require('./transactions.json'));
});

app.listen(8080, () => {
  console.log('Express app listening on port 8080!');
});