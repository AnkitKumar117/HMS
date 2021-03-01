const mongoose = require('mongoose')

//const connectionURL= 'mongodb://127.0.0.1:27017/hms-db'
mongoose.connect("mongodb://127.0.0.1:27017/hms-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
