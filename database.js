const { default: mongoose } = require('mongoose')
const uri = "mongodb+srv://jothinathan:jothi422@cluster0.5zwgrsl.mongodb.net/ecommerce?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)

