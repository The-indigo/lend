const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("../.env");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const bankName = req.body.bankname;
  const accountNumber = req.body.accountnumber;
  const institution = req.body.institution;
  const job = req.body.jobrole;
  if (!firstName || !lastName || !email || !password || !bankName || !accountNumber || !institution || !job) {
    res.status(400).send({
      status: false,
      message: "All fields are required",
    });
    return;
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(423)
        .send({ status: false, message: "This email already in use" });
    }
  });
  bcrypt
    .hash(password, 12)
    .then((password) => {
      let user = new User({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        bankName: bankName,
        accountNumber:accountNumber,
        institution:institution,
        jobRole:job,
      });
      return User.save();
    })
    .then(() =>
      res
        .status(200)
        .send({ status: true, message: "You have succesfully registered" })
    )
    .catch((err) => console.log(err));
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({
            status: "failed",
            message: "User not found,please provide correct credentials",
          });
      }

      bcrypt.compare(password, student.password).then((valid) => {
        if (!valid) {
          return res
            .status(403)
            .send({
              status: "failed",
              message:
                "Incorrect username or password, please provide correct details",
            });
        }
        const token = jwt.sign(
          { email: user.email, id: user._id},
          config.secret,
          { expiresIn: "5hr" }
        );
        res.status(200).send({
          status: "success",
          message: "login successfull",
          user,
          id: user._id,
          token,
        });
      });
    })
    .catch((err) => console.log(err));
};
