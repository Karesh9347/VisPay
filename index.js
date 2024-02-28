const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { checkStatus } = require('./status');
const { initiatePayment } = require('./initiatePayment');
const {Student} = require('./Model/studentSchema');
const {storeStudent}=require("./Controller/student")
const {transactions}=require("./Controller/transaction")
const {StudentL}=require("./Controller/StudentL")
const {verifyToken}=require("./Controller/jwt/middleWear")

const app = express();
const port =process.env.PORT||3001;
const router = express.Router();

dotenv.config();
app.use(cors());
app.use(express.json());
const BASE_URL=process.env.BASE_URL
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

router.post('/initiatePayment', initiatePayment);
router.post('/api/status/:transactionId', checkStatus);
router.post('/registration', storeStudent);
router.post("/addTransaction/:rollNumber",transactions)
router.post("/login",StudentL)
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get("/allTransactions",async(req,res)=>{
  try{
  const allTransactions=await Student.find({})
  console.log(allTransactions)
  return res.json(allTransactions)
  }
  catch(err){
    console.log("error at",err)
  }
})
router.delete("/deleteStudent",async(req,res)=>{
  const {rollNumber}=req.body;
  try{
  const student=await Student.findOneAndDelete({rollNumber})
  if(!student){
    console.log("user not found")
    return res.json({message:"user not found with this roll number"})
  }
  else{
    return res.json({message:"user deleted success fully",user:student})
  }
  }
  catch(error){
    console.log(error)
  }
  

})
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
