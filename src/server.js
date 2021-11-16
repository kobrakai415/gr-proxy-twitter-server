import express from "express"
import cors from "cors"
import Twit from "twit"


const T = new Twit({
    consumer_key: process.env.ApiKey,
    consumer_secret: process.env.ApiKeySecret,
    access_token: process.env.AccessToken,
    access_token_secret: process.env.AccessTokenSecret,
})


const port = process.env.PORT || 3001

const server = express()
server.use(express.json())


const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL, "http://localhost:3000"]

console.log('whitelist:', whitelist)

const corsOptions = {
    origin: function (origin, next) {

        if (whitelist.indexOf(origin) !== -1) {
            next(null, next)
        } else {
            console.log("Cors error!")
        }
    },
    credentials: true
}

server.use(cors(corsOptions));

server.get("/search/:query", (req, res) => {
    try {

        T.get('search/tweets', { q: `${req.params.query}`, count: 10 }, function (err, data, response) {
            err === undefined ? res.status(200).send(data.statuses) : res.send(err)
        })
    } catch (error) {
        console.log(error)
    }

})

server.listen(port, () => {

    console.log("Server listening on port " + port);
});