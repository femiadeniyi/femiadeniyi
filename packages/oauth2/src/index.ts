import {Issuer} from "openid-client"
import express from "express"
import * as chrome from"chrome-launcher"




async function main() {
    const issuer = await Issuer.discover(process.env.DISCOVERY)
    const client = new issuer.Client({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uris: ['http://localhost:5000/cb'],
        response_types: ['code'],
    });
    const url = client.authorizationUrl({
        environment:"sandbox",
        scope: 'com.intuit.quickbooks.accounting openid',
        state:"abc123",
    });
    const app = express()

    app.get("/cb",async (req,res) => {
        const params = client.callbackParams(req);
        console.log(params,req.url)

        const l = await client.callback("http://localhost:5000/cb",params,{state:params.state})
        console.log(params,l)
        res.end()
    })
    app.listen(5000,() => console.log("lis"))
    console.log(issuer,"\n\n====")
    console.log(client,"\n\n====")
    console.log(url)
}

main()

