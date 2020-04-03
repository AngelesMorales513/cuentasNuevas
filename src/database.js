const mongoose = require('mongoose');

///mongoose.connect('mongodb/localhost/notes-db-app')
/*mongoose.connect('mongodb+srv://<username>:<password>@cluster0-d3rf8.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.error(err));*/

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose
//MONGODB_URI
//'mongodb+srv://aurora:mongodb@cluster0-8stan.mongodb.net/test?retryWrites=true&w=majority'
  .connect('mongodb+srv://Angeles:morales@cluster0-d3rf8.mongodb.net/test?retryWrites=true&w=majority'
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("Base de datos conectada"))
  .catch(err => console.error(err));