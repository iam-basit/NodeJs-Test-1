const express = require('express')
const app = express()
const port = 2003
const config = require('./config/database')

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '50mb' }))

const routes = require('./routes/apiRoutes')
app.use('/api', routes)

app.listen(port, () => {
  console.log('server running at port ' + port)
})
