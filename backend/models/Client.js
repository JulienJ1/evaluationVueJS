const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    text: {type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fonction: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    entreprise: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    createdAt: { type: Date, required: true }
})

module.exports = mongoose.model('Client', clientSchema)
