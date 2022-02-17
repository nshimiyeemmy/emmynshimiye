const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
    meterNumber: {
        type: String,
        required: [true, 'Please enter Numbers you want'],
        maxlength:[6, 'Meter number is not bigger than 6 digits']
    },
    
    user_id: {
        ref: 'Users',
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
})
meterSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

module.exports =  mongoose.model('MeterNumber', meterSchema);