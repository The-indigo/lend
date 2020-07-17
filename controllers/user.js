const User = require("../models/user");
const Loan = require("../models/loan");
const bcrypt = require("bcryptjs");
const request = require("request");
const _ = require("lodash");
const Payment = require("../models/payment");
const { initializePayment, verifyPayment } = require("../config/paystack")(
  request
);

exports.getIndex = (req, res, next) => {
  res.render("../views/index", {
    Title: "Welcome to Co-op Lend",
    path: "/",
  });
};

exports.getAbout = (req, res, next) => {
  res.render("../views/about", {
    Title: "Welcome to Co-op Lend",
  });
};

exports.getHow = (req, res, next) => {
  res.render("../views/howitworks", {
    Title: "Welcome to Co-op Lend",
  });
};

exports.getsignUp = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("../views/signup", {
    path: "/signup",
    Title: "Sign Up",
    errorMessage: message,
  });
};

exports.postsignUp = (req, res, next) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const date_of_birth = req.body.date_of_birth;
  const country = req.body.country;
  const city = req.body.city;
  const street = req.body.street;
  const length = req.body.length;
  const password = req.body.password;
  const bankName = req.body.bankname;
  const accountNumber = req.body.accountnumber;
  const institution = req.body.institution;
  const job = req.body.jobrole;
  const staffid = req.body.staffid;
  const salary = req.body.salary;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !date_of_birth ||
    !country ||
    !city ||
    !street ||
    !length ||
    !password ||
    !bankName ||
    !accountNumber ||
    !institution ||
    !job ||
    !staffid ||
    !salary
  ) {
    req.flash("error", "All fields are required");
    return res.redirect("/signup");
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      req.flash("error", "User already exist");
      return res.redirect("/signup");
    }
  });
  bcrypt
    .hash(password, 12)
    .then((password) => {
      let user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        dob: date_of_birth,
        country: country,
        city: city,
        street: street,
        institution: institution,
        jobRole: job,
        length: length,
        bankName: bankName,
        accountNumber: accountNumber,
        staffId: staffid,
        salary: salary,
        password: password,
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getlogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("../views/login", {
    //path:'/login',
    Title: "Log In",
    errorMessage: message,
  });
};

exports.postlogIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (valid) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/dashboard");
            });
          }

          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getcalculator = (req, res, next) => {
  res.render("../views/calculator", {
    Title: "Loan Calculator",
  });
};

exports.getApplyform = (req, res, next) => {
  //console.log(req.user)
  let message = req.flash("error");
  let sucMessage=req.flash("success")
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  if(sucMessage.length > 0){
    sucMessage = sucMessage[0];
  } else {
    sucMessage = null;
  }
  res.render("../views/applyform", {
    Title: "Apply Now",
    errorMessage: message,
    successMessage: sucMessage
  });
};

exports.postApplyForm = (req, res, next) => {
  const amount = req.body.amount;
  const duration = req.body.duration;
  const dateApplied = Date();
  const returnAmount = req.body.returnamount;
  const perMonth = req.body.permonthamount;
  const applicant = req.user._id;

  User.findById(applicant)
    .then((person) => {
      if (!person) {
        req.flash("error", "You are not a valid user");
      } else {
        Loan.find({ applicant: applicant, completed: false }).then((owing) => {
          if (owing.length) {
            // console.log(owing);
            req.flash("error", "You have a pending loan to pay");
            return res.redirect("/apply");
          } else {
            let loans = new Loan({
              applicant: applicant,
              duration: duration,
              amount: amount,
              dateApplied: dateApplied,
              amountPerMonth: perMonth,
              returnAmount: returnAmount,
            });
            return loans.save().then((result) => {
              req.flash("success", "Loan applied succesfully");
              res.redirect("/apply");
            });
          }
        });
      }
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.getDashboard = async (req, res, next) => {
  const applicant = req.user._id;
  try {
    const info = await Loan.findOne({ applicant: applicant, completed: false });
    const declined= await Loan.find
    const table = await Loan.find({ applicant: applicant, completed: true });
    res.render("../views/dashboard", {
      Title: "Dashboard",
      lendee: req.user.firstName,
      info: info,
      table: table,
    });
  } catch (error) {
    console.log(error);
  } 
};

exports.getPaystack = async (req, res, next) => {
  const applicant = req.user._id;
  try {
    const info = await Loan.findOne({
      applicant: applicant,
      completed: false,
    }).populate("applicant");
    res.render("../views/paynow", {
      Title: "Pay",
      info: info,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.payPaystack = (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "full_name", "id"]);
  form.metadata = {
    full_name: form.full_name,
    id: form.id,
  };
  form.amount *= 100;
  initializePayment(form, (error, body) => {
    if (error) {
      console.log(error);
      return;
    }
    response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
};

exports.callBackPaystack = (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error, body) => {
    if (error) {
      console.log(error);
      return res.redirect("/payerror");
    }
    response = JSON.parse(body);
    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.full_name",
      "metadata.id",
    ]);
    [reference, amount, email, full_name, id] = data;
    newPayment = { reference: reference, amount: amount, payer: id };
    const payment = new Payment(newPayment);
    payment
      .save()
      .then((paid) => {
        if (paid) {
          Loan.findOne(paid.payer).then((paying) => {
            //paystack receives in kobo anyways
            if (paying.returnAmount * 100 == paid.amount) {
              console.log(paying.returnAmount * 100 == paid.amount);
              Loan.findByIdAndUpdate(paid.payer, { completed: true }).then(
                (updated) => {
                  if (updated) {
                    console.log(updated);
                  } else {
                    console.log(error);
                  }
                }
              );
            }
          });

          res.redirect("/receipt/" + paid._id);
        }
      })
      .catch((e) => {
        res.redirect("/payerror");
      });
  });
};

exports.getReceipt = (req, res) => {
  const id = req.params.id;
  Payment.findById(id)
    .then((pay) => {
      if (!pay) {
        res.redirect("/payerror");
      }
      res.render("../views/paysuccess", { pay, Title: "Success" });
    })
    .catch((e) => {
      res.redirect("/payerror");
    });
};

exports.getPaystackError = (req, res) => {
  res.render("../views/payerror", { Title: "Payment Failed" });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
