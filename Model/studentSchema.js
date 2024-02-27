const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  date: {const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryFee: {
    type: String,
    required: true,
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  paidFee:{
    type: String,
    required: true,

  },
  totalFee: {
    type: String,
    required:true,
  },
  dob:{
    type:Date,
    required:true,
  },
  section: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,

  },
  mobileNumber: {
    type: String,
    required:true,
  },
  admissionType:{
    type: String,
    required:true,

  },
  regulation:{
    type: String,
    required:true,

  },
  transactions: [transactionSchema],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {Student};

    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryFee: {
    type: String,
    required: true,
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,

  },
  mobileNumber: {
    type: String,
    required:true,
  },
  transactions: [transactionSchema],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {Student};
