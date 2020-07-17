const User = require("../models/user");
const Loan = require("../models/loan");
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

// const transporter=nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_user,
//         api_key
//     }
// }))

exports.getAdmin = async (req, res, next) => {
    try {
        const info = await Loan.find({approved: "awaiting"});
        //const table = await Loan.find({ applicant: applicant, completed: true });
        //console.log(info)
        res.render("../views/admin", {
          Title: "Admin",
          info: info,
         // table: table,
        });
      } catch (error) {
        console.log(error);
      }
}; 

exports.postApprove= async (req,res)=>{
    const id=req.body.id
    const info = await Loan.find({approved: "awaiting"});

    try{
        const approve= await Loan.findByIdAndUpdate(id,{approved:"yes"})
        if(approve){
            res.render("../views/admin", {
                Title: "Admin",
                info: info,
              });
        } 
    }catch (error) {
        console.log(error); 
      }
}

exports.postDecline= async (req,res)=>{ 
    const id=req.body.id
    const info = await Loan.find({approved: "awaiting"});

    try{
        const decline= await Loan.findByIdAndUpdate(id,{approved:"no"})
        if(decline){
            const del=await Loan.findByIdAndDelete(id)
            if(del){
                res.render("../views/admin", {
                    Title: "Admin",
                    info: info,
                  });
            }
     
        } 
    }catch (error) {
        console.log(error);
      }
}