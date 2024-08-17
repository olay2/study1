const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser') 
const connectBD = require('./Config/db')

// const productRouters = require('./Routes/product')
// const authRouters = require('./Routes/auth')

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('uploads'))
app.use(bodyParse.json({ limit: '10mb'}))
connectBD()
 
// app.use('/api', productRouters)
// app.use('/api', authRouters)

readdirSync('./Routes')
.map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => {
  console.log("listening on port 5000")
})
