import * as dotenv from 'dotenv'
dotenv.config()
import express , { Express , Request, Response} from 'express'

const app: Express = express()

app.use(express.json())


app.get('/',(req,res) => {
    res.send('<h1>Hello World</h1>')
})

const PORT  = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000;

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}...`)
})