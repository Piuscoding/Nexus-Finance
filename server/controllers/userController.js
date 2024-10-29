const User = require('../Model/User');
const Upgrade = require("../Model/upgradeSchema");
const transferMoney = require('../Model/transfer');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// handle errors
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








module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
    


    module.exports.contactPage = (req, res)=>{
        res.render("contact")
   }
        
   module.exports.affliatePage = (req, res)=>{
    res.render("affiliate_program")
    }
    
    module.exports.startguidePage = (req, res)=>{
        res.render("services")
    }

     module.exports.licensePage = (req, res)=>{
        res.render("license")
   }
        
   module.exports.faqPage = (req, res)=>{
    res.render("faqs")
    }
    
    module.exports.termsPage = (req, res)=>{
        res.render("terms")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }

    module.exports.loginAdmin = (req, res) =>{
        res.render('loginAdmin');
    }
    
    const sendEmail = async ( fullname, email,  password ) =>{
    
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
            subject: 'Welcome to GLOBALFLEXTYIPESTS',
            html: `<p>Hello  ${fullname},<br>You are welcome to   Globalflextyipests, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.
      
            Please note that your deposit is with the wallet address provided by   Globalflextyipests trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Globalflextyipests, hence your deposit is invalid.<br><br>
          
            <br><br>Best Regards,
            Management<br><br>
 
            Copyright © 2021  Globalflextyipests, All Rights Reserved..<br><br>
            Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
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
      
      
        } catch (error) {
          console.log(error.message);
        }
      }
      
      


module.exports.register_post = async (req, res) =>{
  const {fullname,email,Dob,gender,tel,employ,account,address,aptNo,country,region,
    pin, username,password} = req.body;
  try {
   
      const user = await User.create({ fullname,email,Dob,gender,tel,employ,account,address,aptNo,  country,  region,pin, username, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });

      // if(user){
      //   sendEmail(req.body.fullname,req.body.email, req.body.password)
      // }else{
      //   console.log(error);
      // }
    }
      catch(err) {
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}
const loginEmail = async (  email ) =>{
    
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
        subject: 'Your account has recently been logged In',
        html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
       if it's not you kindly message support to terminate access  <br>You can login here: https://globalflextyipests.com/login.<br>Thank you.</p>`
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
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  

  module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = async(req, res) =>{
  // const id = req.user
  // const user = await User.findById(id).populate("transfers")
  // res.render("paymentHistory",{user})
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
   res.render('dashboard',{
    infoErrorsObj,infoSubmitObj
   })
}


const verifyEmail = async (email,fullname ) =>{
    
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
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Verification request',
        html: `<p>Hello ${fullname},<br>you made a verification request.<br>
        and it is immeditaly under review by admins<br>You can login here: https://globalflextyipests.com/loginAdmin<br> to check your verification status.<br>Thank you.</p>`
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
  
  
    } catch (error) {
      console.log(error.message);
    }
  }


module.exports.editProfilePage_post= async(req, res) =>{
  try {
    await User.findByIdAndUpdate(req.params.id,{
      fullname: req.body.fullname,
      Dob:req.body.Dob,
      gender: req.body.gender,
      tel:req.body.tel,
      employ:req.body.employ,
      country: req.body.country,
      region:req.body.region,
      address:req.body.address,
      aptNo:req.body.aptNo,
      nkFullname:req.body.nkFullname,
      nktel:req.body.nktel,
      nkRe:req.body.nkRe,
      nknkaddress:req.body.nknkaddress,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
await res.redirect("/dashboard");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }
}

module.exports.editAvatarPage = async(req, res) =>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
    await User.findByIdAndUpdate(req.params.id,{
      image: newImageName,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
    await res.redirect("/dashboard");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }
  // res.render('change_password');
}

module.exports.changePage= async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('dashboard',{infoErrorsObj, infoSubmitObj});
}

const upgradeEmail = async (  email, amount, method ) =>{
    
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
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Account Upgrade Request Just Made',
        html: `<p>Hello SomeOne,<br>made an account upgrade request of ${amount}.<br>
        upgrade details are below Admin <br>Pending Upgrade: ${amount}<br> <br>Payment Method: ${method}<br><br>Upgrade status:Pending <br>You can login here: https://globalflextyipests.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
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
  
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  
  module.exports.upgradePage_post = async(req, res)=>{
      try {
       
          const upgrade = new Upgrade({
            loan_category: req.body.loan_category,
            loan_amount: req.body.loan_amount,
            loan_interest_percentage: req.body.loan_interest_percentage,
            loan_interest_amount: req.body.loan_interest_amount,
            loan_duration: req.body.loan_duration,
            status: req.body.status,
            loan_reason:req.body.loan_reason,
            repayment: req.body.repayment,
            payStatus: req.body.payStatus
          })
          upgrade.save()
          const {id} = req.params;
          const user = await User.findById(id);
           user.upgrades.push(upgrade)
          await user.save();
          req.flash('infoSubmit', 'Loan under review waiting for approval.')
              res.render("my_loans",{user})
      } catch (error) {
          console.log(error)
      }
  }
  
  module.exports.UpgradeHistory = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id).populate("upgrades")
    res.render('my_loans',{user})
  }

  

  // module.exports.intPage_post = async(req, res, next)=>{
  //   try {
  //              const transMonie = new transferMoney({  
  //               Bank: req.body.Bank,
  //                amount: req.body.amount,
  //                accName: req.body.accName,
  //                accNo: req.body.accNo,
  //                pin: req.body.pin,
  //                swiftCode: req.body.swiftCode,
  //                note: req.body.note,
  //                status: req.body.status
  //           });
  //           transMonie.save()
  //           next();
  //           const {id} = req.params;
  //           const user = await User.findById(id);
  //             if(user.txn_code_01 === maxnumber){
  //               // Proceed with transfer
  //               user.transfers.push(transMonie)
  //               await user.save();
  //               req.flash('infoSubmit', 'international transfer successful waiting for approval.')
  //               res.redirect('/dashboard')
  //             }else{
  //               global.alert('invalid virtual card')
  //             }
         
  //   } catch (error) {
  //   req.flash('infoErrors', error);
  //   // console.log(error)
  //   }
  // }
  

  module.exports.TPage_post = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id).populate("transfers")
    res.render('t_history',{user})
  }
  



  module.exports.wirePage_post = async(req, res)=>{
    // let maxnumber = 6
    try {
      const {id} = req.params;
            const user = await User.findById(id);
      if(user.txn_code_01 === 0){
        req.flash('infoSubmit', 'invalid cot code, kindly email admin for one')
        // infoErrors
        await res.redirect("/dashboard");
            console.log("not sucessful")
      }
      else{
        const transMonie = new transferMoney({  
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
           status: req.body.status
      });
      transMonie.save()
      // Proceed with transfer
      user.transfers.push(transMonie)
      await user.save();
      req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
      res.redirect('/dashboard')
      }  
    } catch (error) {
    req.flash('infoErrors', error);
    // console.log(error)
    }
  }

  module.exports.vcard_post = async(req, res)=>{
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (user.V_code === 0){
        req.flash('infoSubmit', 'Virtual card is invalid')
        // infoErrors
        await res.redirect("/dashboard");
            console.log("not sucessful")
      }else{
        await User.findByIdAndUpdate(req.params.id,{
          V_code: req.body.V_code,
          updatedAt: Date.now()
        });
        req.flash('infoSubmit', 'virtual is activated successfully')
    await res.redirect("/dashboard");
        console.log("redirected")
      }
    } catch (error) {
      console.log(error);
    }
    // res.render('dashboard')
  }
  

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}




