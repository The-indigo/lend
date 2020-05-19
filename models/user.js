const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bankName:{
    type:String,
    required:true
},
  accountNumber: {
    type: Number,
    required: true,
  },
  institution:{
    type: Number,
    required: true,
  },
  jobRole:{
    type: Number,
    required: true,
  },
  loan:[Number],

  returnDate:{
      type:Date
  }
});

// userSchema.methods.addToCart=function(product){
//     const cartProductIndex=this.cart.items.findIndex(cp=>{
//         return cp.productId.toString()===product._id.toString();
//     });
//     let newQuantity=1;
//     const updatedCartItems=[...this.cart.items];
//     if(cartProductIndex >= 0){
//         newQuantity=this.cart.items[cartProductIndex].quantity +1
//         updatedCartItems[cartProductIndex].quantity=newQuantity;
//     }else{
//         updatedCartItems.push({
//             productId:product._id,
//             quantity:newQuantity
//         })
//     }
//     const updatedCart={
//         items:updatedCartItems
//     };
//     this.cart=updatedCart
//     return this.save();
// }

// userSchema.methods.removeFromCart= function(productId){
//     const updatedCartItems=this.cart.items.filter(item=>{
//         return item.productId.toString() !==productId.toString();
//     })
//     this.cart.items=updatedCartItems
//     return this.save();
// }

module.exports = mongoose.model("User", userSchema);