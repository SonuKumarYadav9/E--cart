const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");

const isValid = function(value){
    if(!value || typeof value !="string" || value.trim().length == 0)return false;
    return true;
};
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}







const getUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, msg: `Oops! ${userId} This Not Valid UserId ` });
    let userDetail = await userModel.findById({ userId });
    if (!userDetail) {
      return res.status(404).send({ status: false, msg: "User you are searching for is not here" });
    } else {
      res.status(200).send({
        status: true,
        msg: "Your details is here",
        data:userDetail
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};



 const userLogin = async (req,res)=>{
    try {
        let data= req.body
        let {email,password}= data        
        if(!isValidRequestBody(data)){
            return res.status(400).send({status:false,msg:"Please enter email and Password"})
        }
        if(!isValid(email)) return res.status(400).send({ status:false,msg:"Please enter email"});
        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!emailValidator.test(email)) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })
        }
       
        if(!isValid(password))return res.status(400).send({ status:false,msg:"Please enter Password"});
        let user = await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send({status:false,msg:"InvalidEmail Found"})
        };

        const token = jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 10 * 60 
        }, 'functionup-project-5')
        res.header('Authorisation', token)
        return res.status(200).send({ status: true,
             message: "User successfully loggedin",
              data: token });
    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    }
 }
