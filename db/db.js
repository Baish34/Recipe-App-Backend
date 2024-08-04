const mongoose = require('mongoose')

// Access mongoDb connection string form secrets
const mongoURI = process.env.MONGODB

const initializeDatabase = async () => {
  try{
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    if(connection){
      console.log("Connected successfully.")
    }
  }catch(error){
    console.log("Connection failed", error)
  }
}

module.exports = {initializeDatabase}
