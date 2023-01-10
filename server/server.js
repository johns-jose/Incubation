const express = require("express")
const app= express()
const cors = require('cors')
const dotenv=require('dotenv')

const userRouter = require('./routes/users')
const adminRouter = require('./routes/admin')


//mongodb connection
    const{connectdb}=require('./helpers/mongo_init')
connectdb()



app.use(cors())
dotenv.config()

app.use(express.json())
app.use('/',userRouter)
app.use('/admin',adminRouter)






app.listen(5000,()=>
console.log(`server is running on port 5000`)
)