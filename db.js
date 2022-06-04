const {connect} = require('mongoose');

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_CONNECT);
        console.log('Mongo DB connected')
    } catch (error) {
        console.log(error)        
    }
}    
    


module.exports = {connectDB}