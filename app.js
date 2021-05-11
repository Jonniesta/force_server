require("dotenv").config();
let express = require('express');
let app = express();
let trainer = require('./controllers/trainerController')
let User = require('./controllers/userController');


const sequelize = require('./db');
const Trainer = require('./controllers/trainerController');
sequelize.sync();
//sequelize.sync({force:true})

app.use(express.json());
app.use(require('./middleware/headers'));

//Exposed Route
app.use('/user', User);


//Protected
app.use(require('./middleware/validate-session'));
app.use('/trainer', trainer);



app.listen(3000, function(){
    console.log('App is listening on port 3000');
})