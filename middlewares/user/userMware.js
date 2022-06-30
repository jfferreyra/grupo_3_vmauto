const userModel = require("../../models/userModel");

const userMware={
  auth:function(req,res,next){
    if(!req.session.userlog){
      return res.redirect('/user/login');
    }
    next()
  },
  guest:function(req,res,next){
    if(req.session.userlog){
      return res.redirect('/');
    }
    next()
  },
  logued:function(req,res,next){
    let userEmail=req.cookies.userEmail;
    if(userEmail){
      req.session.userlog=userModel.find('email',userEmail);
    }
    if(req.session.userlog){
      res.locals.userlog=req.session.userlog;
    }
    next();
  }
}

module.exports=userMware;