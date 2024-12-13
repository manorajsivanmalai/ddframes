const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const teamsRouter = require('./controller/teamsController/teamsapi.js');
const offersRouter = require('./controller/offersController/offersapi.js');
const productsRouter = require('./controller/productController/productsapi.js');
const ordersRouter = require('./controller/ordersController/ordersapi.js');
const membersRouter = require('./controller/membersController/api.member.js');
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', teamsRouter);
 app.use('/api/', offersRouter);
 app.use('/api/', productsRouter);
 app.use('/api/', ordersRouter);
app.use('/api/', membersRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})