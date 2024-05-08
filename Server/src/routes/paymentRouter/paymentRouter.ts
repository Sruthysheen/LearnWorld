import express from 'express';
const paymentRouter = express.Router();

paymentRouter.get("/",(req,res)=>{
    res.json({status:true})
})

export default paymentRouter