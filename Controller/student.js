const express = require('express');
const {Student} = require('../Model/studentSchema');

const storeStudent = async (req, res) => {
  const { name, rollNumber, mobileNumber,password } = req.body;

  try {
    if (!mobileNumber && !rollNumber && !name&&!password) {
      console.log('User is not created');
      return res.status(400).json({ error: 'User is not created. Please provide valid data.' });
    }
    const newStudent = new Student({
      name,
      rollNumber,
      mobileNumber,
      password,
    });
    const existStudent=await Student.findOne({rollNumber});
    if(existStudent){
      res.json({message:"user exist with this number"})
    }
    
    await newStudent.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { storeStudent };
