const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
// Increase request size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const Routers = require('./routes/index');
const db = require('./model/index');
db.connectToDB();
app.use(express.json());
app.use('/api', Routers);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
