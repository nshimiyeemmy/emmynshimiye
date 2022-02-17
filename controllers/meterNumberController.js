
const MeterNumber = require('../models/meterNumber');

//create a meter number   => /api/v1/meters/new
exports.createMeter = async (req, res, next) => {
    let meterNumber = new MeterNumber({
        meterNumber: req.body.meterNumber,
        user_id: req.user._id,
    })
    meterNumber = await meterNumber.save();
    if(!meterNumber)
    return res.status(400).send('the meter number cannot be created!')

    res.send(meterNumber);
    };

    //get categories   => /api/v1/meters
exports.getMeterNumbers = async (req, res, next) => {
    const meterNumberLists = await MeterNumber.find();

    if(!meterNumberLists) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(meterNumberLists);
}

   //get meter by Id   => /api/v1/meters/:id
   exports.getOneMeter = async (req, res, next) => {
    const meter = await MeterNumber.findById(req.params.id);

    if(!meter) {
        res.status(500).json({message: 'The meter the given ID was not found.'})
    } 
    res.status(200).send(meter);
}
//delete meter  => /api/v1/meter/:id
exports.deleteMeter = async (req, res, next) => {
    MeterNumber.findByIdAndRemove(req.params.id).then(meter =>{
        if(meter) {
            return res.status(200).json({success: true, message: 'the meter is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "meter not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

