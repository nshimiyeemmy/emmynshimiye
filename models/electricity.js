const mongoose = require('mongoose');

const electricitySchema = new mongoose.Schema({
    amountToPay: {
        type:Number,
        required:[true, 'Please enter amount of money']
    },
    meterNumber: {
        type:Number,
        required:[true, 'Please enter your meter number'],
        maxlength: [6, 'Meter Number is only 6 digits']

    },
    Buyer: {
        ref: 'Users',
        type: mongoose.Schema.Types.ObjectId
    },
    
  createdAt: {
    type: Date,
    default: Date.now(),
  }
    
});

const randomTokens = function generateTokens() {
    var token = ''; 
            var str = '123456789' 
            for (i = 1; i <= 10; i++) { 
                var char = Math.floor(Math.random() 
                            * str.length + 1); 
                pass += str.charAt(char) 
            }   
            return token;  
}

electricitySchema.virtual('id').get(function(){
    return this._id.toHexString();
})
electricitySchema.set('toJSON',{
    virtuals:true,
})
module.exports =  mongoose.model('Electricity', electricitySchema);
