import express from "express"
import cors from "cors"
import Twit from "twit"
import createError from "http-errors"
import { catchAllErrorHandler, forbiddenErrorHandler } from "./errorhandler.js"

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
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1) {
            next(null, next)
        } else {
            next(createError(403, { message: "Origin not allowed" }))
        }
    },
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

server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

server.listen(port, () => {

    console.log("Server listening on port " + port);
});