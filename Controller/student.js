const express = require('express');
const {Student} = require('../Model/studentSchema');

const storeStudent = async (req, res) => {
  const { name, rollNumber, mobileNumber,password ,admissionType,year,section,paidFee,totalFee,regulation,dob} = req.body;
  if (!mobileNumber || !rollNumber || !name || !password || !admissionType || !year || !section || !paidFee || !totalFee || !regulation || !dob) {
    console.log('User is not created');
    return res.status(400).json({ error: 'User is not created. Please provide valid data.' });
  }
  

  try {
  
    const newStudent = new Student({
      name,
      rollNumber,
      mobileNumber,
      password,
      admissionType,
      year,
      section,
      paidFee,
      regulation,
      totalFee,
      dob,
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
