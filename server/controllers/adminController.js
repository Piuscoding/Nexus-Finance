
const jwt = require('jsonwebtoken')
// const Deposit = require("../Model/depositSchema");
const User = require("../Model/User");
// const Widthdraw = require("../Model/widthdrawSchema");
// const Verify = require("../Model/verifySchema");
const Upgrade = require("../Model/upgradeSchema");
// const Trade = require("../Model/livetradingSchema");
// const sendMoney = require('../Model/sendSchema');
// const exchangeMoney = require('../Model/exchangeSchema');
const transferMoney = require('../Model/transfer');
// const Ticket  = require('../Model/ticketSchema');
const nodemailer = require('nodemailer');


const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }


  return errors;
}


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'piuscandothis', {
    expiresIn: maxAge
  });
};


module.exports.loginAdmin_post = async(req, res) =>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});

    if(user){
    const passwordMatch = await (password, user.password);

    if (passwordMatch) {
      
      if(!user.role == "admin"){
        res.render('login', handleErrors('Email and password is incorrect') )
      }else{
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
      }
      
    } else {
      res.render('login', handleErrors() )
    }
    } else{
      res.render('login',handleErrors() )
    }
    
  } catch (error) {
    console.log(error)
  }
    
}




// *******************ADMIN DASHBOARD CONTROLLERS *************************//


module.exports.adminPage = async(req, res) =>{
        let perPage = 100;
        let page = req.query.page || 1;
    
        try {
          const user = await User.aggregate([ { $sort: { createdAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(); 
          // const count = await User.count();
    
          res.render('adminDashboard',{user});
    
        } catch (error) {
          console.log(error);
        } 
    } 


module.exports.viewUser = async(req, res) =>{
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.render("viewUser",{
          user
        })
    
      } catch (error) {
        console.log(error);
      }
    
    }
  


    module.exports.editUser = async(req, res) =>{
      try {
          const user = await User.findOne({ _id: req.params.id })
      
          res.render('editUser', {
            user
          })
      
        } catch (error) {
          console.log(error);
        }
  }
const sendEmail = async ( fullname,email, available,  balance, bonus, widthdrawBalance,profit,totalDeposit,totalWidthdraw,verifiedStatus,account, session ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:'globalfl@globalflextyipsts.com',
      to:email,
      subject: 'Dashboard Update',
      html: `<p>Greetings ${fullname},<br>Here are your availabe balances and your trading account status.<br>
      login to see your dashboard:<br>Email:${email}<br>Available balance: ${available}<br>Deposit Balance: ${balance}<br>Bonus:${bonus}<br>Widthdrawal Balance: ${widthdrawBalance}<br>Account Profit:${profit}<br>Total Deposit:${totalDeposit}<br>Total Widthdraw: ${totalWidthdraw}<br> Verification status: ${verifiedStatus}<br>Account Level: ${account}<br>trading sessions: ${session}<br><br>You can login here: https://globalflextyipests.com/loginAdmin<br>.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})
}catch (error) {
  console.log(error.message);
}

}



module.exports.editUser_post = async(req, res) =>{
  try {
    await User.findByIdAndUpdate(req.params.id,{
      fullname: req.body.fullname,
      email: req.body.email,
      country: req.body.country,
      tel:req.body.tel,
      accNo: req.body.accNo,
      balance: req.body.balance,
      V_code: req.body.V_code,
      txn_code_01: req.body.txn_code_01,
      updatedAt: Date.now()
    });
      //  if(User){
      // sendEmail(req.body.fullname,req.body.email, req.body.available, req.body.balance, req.body.bonus,req.body.widthdrawBalance, req.body.profit, req.body.totalDeposit,req.body.totalWidthdraw,req.body.signal, req.body.verifiedStatus,req.body.account, req.body.session )
      // }else{
      //   console.log(error);
      // }
      await res.redirect(`/editUser/${req.params.id}`); 
      console.log('redirected');

  } catch (error) {
    console.log(error);
  }
    
}


module.exports.deletePage = async(req, res) =>{
  try {
    await User.deleteOne({ _id: req.params.id });
      res.redirect("/adminRoute")
    } catch (error) {
      console.log(error);
    }
}




// // *******************ACCOUNT UPGRADES CONTROLLERS *************************//

module.exports.allupgradesPage = async(req, res)=>{
  let perPage = 100;
  let page = req.query.page || 1;

  try {
    const upgrade = await Upgrade.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
    // const count = await Widthdraw.count();

    res.render('allAccountsUpgrade',{
      upgrade
    });

  } catch (error) {
    console.log(error);
  } 
}


module.exports.viewUprgadesPage = async(req, res)=>{

  try {
    const upgrade = await Upgrade.findOne({ _id: req.params.id })

res.render('viewallAccountsUpgrade',{
  upgrade
})

      } catch (error) {
        console.log(error);
      }
}

module.exports.editUpgradesPage = async(req, res)=>{
  try {
    const upgrade = await Upgrade.findOne({ _id: req.params.id })

  res.render('editallAccountsUpgrade',{
  upgrade
  })
      } catch (error) {
        console.log(error);
      }
}

module.exports.editUpgrade_post  = async(req, res)=>{
  try {
    await Upgrade.findByIdAndUpdate(req.params.id,{
      loan_category:req.body.loan_category,
       loan_amount:req.body.loan_amount,
       loan_duration:req.body.loan_duration,
       loan_interest_amount:req.body.loan_interest_amount,
       loan_interest_percentage:req.body.loan_interest_percentage,
       loan_reason:req.body.loan_reason,
       repayment:req.body.repayment,
       payStatus: req.body.payStatus,
       status:req.body.status,
      updatedAt: Date.now()
    });
    await res.redirect(`/editUpgrade/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}

module.exports.deleteUpgrade = async(req, res)=>{
  try {
    await Upgrade.deleteOne({ _id: req.params.id });
    res.redirect("/adminRoute")
  
} catch (error) {
    console.log(error)
}
}

// ********************************TRANSFER*******************************************//

module.exports.allTransfer = async(req, res)=>{
  let perPage = 100;
  let page = req.query.page || 1;

  try {
    const transfer = await transferMoney.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
    // const count = await Widthdraw.count();

    res.render('allTransfer',{transfer});

  } catch (error) {
    console.log(error);
  } 
}

module.exports.editTransferPage = async(req, res)=>{
  try {
    const transfer = await transferMoney.findOne({ _id: req.params.id })

  res.render('editTransfer',{
    transfer
  })
      } catch (error) {
        console.log(error);
      }
}

module.exports.editTransfer_post  = async(req, res)=>{
  try {
    await transferMoney.findByIdAndUpdate(req.params.id,{
      Bank: req.body.Bank,
      amount: req.body.amount,
      Bamount: req.body.Bamount,
      Afamount: req.body.Afamount,
      beneficiary: req.body.beneficiary,
      accNo: req.body.accNo,
      pin: req.body.pin,
      swiftCode: req.body.swiftCode,
      country: req.body.country,
      note: req.body.note,
      status: req.body.status,
      updatedAt: Date.now()
    });
    await res.redirect(`/editTransfer/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}

module.exports.viewTransfer= async(req, res)=>{
  try {
    const transfer = await transferMoney.findOne({ _id: req.params.id })

res.render('viewTransfer',{transfer})
      } catch (error) {
        console.log(error);
      }
}

module.exports.deleteTransfer = async(req, res)=>{
  try {
    await transferMoney.deleteOne({ _id: req.params.id });
    res.redirect("/adminRoute")
  
} catch (error) {
    console.log(error)
}
}


