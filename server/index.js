import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import morgan from 'morgan'
import dotenv from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

const PORT = process.env.PORT || 5003

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use('/assets', express.static(path.join(__dirName, 'public/assets')))


const storege = multer.diskStorage({destination: function (req,file,cb){
  cb(null,'public/assets')
},
filename: function (req,file,cb){
  cb(null,file.originalname)
},
})

const upload  = multer({storege})

mongoose.connect(process.env.MONGOURI).then(()=>{

  app.listen(process.env.PORT, () => {
    console.log('Running your socials backend ON port ' + PORT)
  })
})

