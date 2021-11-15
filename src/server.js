import express from "express"
import cors from "cors"
import Twit from "twit"

const consumer_key = process.env.ApiKey
const consumer_secret = process.env.ApiKeySecret

const T = new Twit({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: process.env.AccessToken,
    access_token_secret: process.env.AccessTokenSecret,
})

console.log(process.env.PORT)
const port = process.env.PORT || 3001

const server = express()
server.use(cors())
server.use(express.json())


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