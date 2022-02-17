   
const meterNumber = require('../models/meterNumber')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const initialMeters = [
    {
      _id: "5a422a851b54a676234d17f7",
      meterNumber: 123456,
      user_id : "5a422a851b54a676234d17f7",
      __v: 0
    },
    {
        _id: "5a422g851b54a676234d17f7",
        meterNumber: 567890,
        user_id : "5a4a2a851b54a676234d17f7",
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17ff",
        meterNumber: 674833,
        user_id : "5a422a851b54a676234d1ft7",
        __v: 0
      },,
]

const metersInDb = async () => {
  const meters = await meterNumber.find({})
  return meters.map(meter => meter.toJSON())
}

const signToken = async (username) => {
  const user = await User.findOne({ email })

  const userForToken = {
      email: user.email,
      id: user._id
  }

  return jwt.sign(userForToken, "efrfb34")
}

module.exports = { initialMeters, metersInDb, signToken }