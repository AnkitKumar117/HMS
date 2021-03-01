const mongoose=  require('mongoose')

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String, 
        required:true
    },
    branch: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    facilities: [
        {
            name: {
                type: String
            }
        }
    ]
})

const Hospital = mongoose.model("hospital", hospitalSchema);

module.exports = Hospital;