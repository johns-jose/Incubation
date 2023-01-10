const express = require('express')
const router = express.Router()
const User = require('../modal/user/UserSchema')
const bcyrpt = require('bcrypt')
const app = require('../server')
const { model } = require('mongoose')
const jwt = require('jsonwebtoken')
const application = require('../modal/user/application')
const { request } = require('express')


//jwt token verification
function verifyToken(req,res,next){
   let authHeader = req.headers.token;
   console.log('authHeader:',req.headers.token);
   if(authHeader==undefined){
    res.status(401).json({error:'Account verification failed'})
    }
    console.log('1');
    let Token = authHeader.split(" ")[1]
    console.log('2',Token);
    jwt.verify(Token,"ABCD1234",function(err,decoded){
    if(err){
        console.log(err);
        res.status(500). json({error:'Authentication failed'})
       
    }else{
        console.log("success");
        next()
    }
    })
   
}


router.post('/signin', async (req, res) => {
    console.log('data:', req.body);
    try {

        const { userName, email, phone, password } = req.body
        Password = await bcyrpt.hash(password, 10)
        const user = new User({
            userName: userName,
            email: email,
            phone: phone,
            password: Password

        })

        const uservalid = await User.findOne({ email: email })
        if (!uservalid) {

            await user.save()
            res.status(200).json({ res: user })

        } else {
            res.json('invalid')
        }

    } catch (error) {
        console.log(error);
    }

})


router.post("/login", async(req, res) => {
    console.log('req.body:', req.body);
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email: email })
   


        if (!user) {
            res.json('Invalidemail')
        } else {
            const auth = await bcyrpt.compare( password,user.password )
            if (auth) {
                const id = user._id
                console.log('id:', id);
                const token = jwt.sign({ id }, "ABCD1234", { expiresIn: "7d" })
                console.log('token:', token)
                res.json({user,token,auth:true })
                
            } else {
                res.json('Invalidpass')
            }
        }
    } catch (error) {
        console.log(error);
    }

})
router.get('/getUserInfo/:id',async(req,res)=>{
    const userid = req.params.id
    // console.log('userid:',userid);
    userDetails = await User.findOne({_id:Object(userid)})
    // console.log('userdetails',userDetails);
    res.json(userDetails)

})


router.post('/application', verifyToken , async(req,res)=>{
  
    console.log('req.body',req.body);
    const{ fname,
        email,
        streetAddress,
        city,
        state,
        pin,
        country} = req.body


 try {
    const Application = new application({
        fname,
        email,
        streetAddress,
        city,
        state,
        pin,
        country
    })
    await Application.save()
    res.json({msg:'Application submited'})
 } catch (error) {
    res.json(error)
 }
    


})







module.exports = router