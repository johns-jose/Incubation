const express = require('express');
const router = express.Router()
const app = require('../server')
const jwt = require('jsonwebtoken');
const application = require('../modal/user/application');
const { json } = require('express');
const slot = require('../modal/user/slotSchema');
const { default: mongoose, Mongoose } = require('mongoose');

//jwt token verification
function verifyToken(req, res, next) {
    let authHeader = req.headers.token;
    console.log('authHeader:', req.headers.token);
    if (authHeader == undefined) {
        res.status(401).json({ error: 'Account verification failed' })
    }
    console.log('1');
    let Token = authHeader.split(" ")[1]
    console.log('2', Token);
    jwt.verify(Token, 'XYZ123', function (err, decoded) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Authentication failed' })

        } else {
            console.log("success");
            next()
        }
    })

}


router.post('/adminLogin', (req, res) => {
    const adminEmail = 'admin@gmail.com'
    const adminPass = 12345
    console.log(req.body, '44444444444444');
    const { email, password } = req.body

    if (email == adminEmail && password == adminPass) {

        const adminToken = jwt.sign({ adminEmail }, 'XYZ123', { expiresIn: '7d' })

        res.status(201).json({ adminToken, auth: true })
    } else {

        res.status(500).json({ error: "Innvalid Email or Password" })
    }
})
router.get("/app", verifyToken, async (req, res) => {
    const appDetails = await application.find({ status: 'pending' })
    res.status(201).json(appDetails)
    // console.log('APPDETAILS', appDetails)

})
router.post('/approved/:id', async (req, res) => {
    console.log(req.params.id);
    await application.findByIdAndUpdate({ _id: Object(req.params.id) }, {
        $set: { status: 'approved' }
    }).then(async (response) => {
        await application.find({ status: "pending" }).then((response) => {
            console.log(response, '...............');
            res.status(201).json({ update: true, response })
        })

    }).catch((error) => {
        res.json(error)

    })
})
router.get('/getApprovedList', async (req, res) => {
    // console.log('start');
    await application.find({ status: 'approved' }).then((response) => {
        // console.log(response);
        if (response) res.status(201).json(response)
    }).catch((error) => {
        res.json(error)
    })

})

router.post('/rejected/:id', async (req, res) => {
    console.log(req.params.id);
    await application.findByIdAndUpdate({ _id: Object(req.params.id) }, {
        $set: { status: 'rejected' }
    }).then(async (response) => {
        await application.find({ status: 'pending' }).then((response) => {
            console.log(response, '...............');
            res.status(201).json({ update: true, response })

        })


    }).catch((error) => {
        res.json(error)

    })
})
router.get('/getRejectedList', async (req, res) => {
    await application.find({ status: 'rejected' }).then((response) => {
        if (response)
            res.status(201).json(response)

    }).catch((error) => {
        res.json(error)
    })
})
router.get('/progress', async (req, res) => {
    await application.find({}).then((response) => {
        console.log(response);
        if (response)
            res.status(201).json(response)
    }).catch((error) => {
        res.json(error)
    })
})
router.get('/getBookingSlot', async (req, res) => {
    await slot.find({}).then((response) => {
        res.status(201).json(response)
    }).catch((error) => {
        res.json(error)
    })

})
router.post('/slotbooking', async (req, res) => {
    const { name, slotid } = req.body;
    console.log(name, slotid, '11111');
    let data = await slot.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(slotid) }, { companyName: name }).then(async (response) => {

        await slot.find({}).then((response) => {
            console.log(response);
            res.status(201).json(response)
        }).catch((error) => {
            res.json(error)
        })
    })


    application.updateOne({ fname: name },{ status:'booked' }).then((response)=>{
        console.log(response,"booked");
        // res.status(201).json(response)
    }).catch((error)=>{
        res.json(error)
    })
})



module.exports = router