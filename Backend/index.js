import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { AdminRouter } from './Routes/Admin.js'
import { FoodRouter } from './Routes/AddFood.js'
import { DrinksRouter } from './Routes/Drinks.js'
import { FlowerRouter } from './Routes/AddFlowers.js'
import { DessertsRouter } from './Routes/Dessert.js'
import mpesaRoutes from './Routes/Mpesa.js';


const app=express()

app.use(express.json())

app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true,
    optionsSuccessStatus:200,
    allowedHeaders:['Content-Type','Authorization']
}))

app.use(cookieParser())
// Static folder for serving uploaded images
app.use('/uploads', express.static('uploads'));

app.use('/admin',AdminRouter );
app.use ('/foods',FoodRouter)
app.use('/drinks',DrinksRouter)
app.use('/flowers',FlowerRouter)
app.use('/desserts',DessertsRouter)
app.use('/mpesa', mpesaRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Success db connection')
    app.listen(process.env.PORT,()=>{
        console.log(`server is running ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('error connecting to db: ' +err)
})




