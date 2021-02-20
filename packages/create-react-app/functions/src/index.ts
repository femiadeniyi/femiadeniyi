import * as functions from "firebase-functions";
import firebase from "firebase-admin";
import {Issuer, TokenSet} from "openid-client"
import axios from "axios"
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
});

const firestore = firebase.firestore()

const {
    users,
} = {
    users:"users",
}

interface CreateSupplierProps {
    Suffix?:string
    Title?:string
    MiddleName?:string
    FamilyName?:string
    GivenName?:string
    DisplayName:string
    accessToken:string
    quickbooksId:string
}

interface InvoiceDataTimesheet {
    date:string
    description:string
    rate:string
    hours:string
}
interface InvoiceData {
    id:string
    week: {
        name:string
        timesheets:InvoiceDataTimesheet[]
    }
}

interface Vendor {
    Id:string
}


export const helloWorld = functions.https.onCall((data, context) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  return "Hello from Firebase!"
});


// PrimaryEmailAddr
export const updateSupplier = functions.https.onCall((data, context) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    return "Hello from Firebase!"
});

export const getSupplier = functions.https.onCall(async (data:InvoiceData, context) => {
    const [{
        quickbooksId,
        accessToken,
        refreshToken,
        expireTime
    }] = await get("users","","id", "==","oauth")()

    async function getToken(){
        const now = new Date()
        console.log(new Date(Number(expireTime*1000)) < now,"koo")
        if(new Date(Number(expireTime*1000)) < now){
            const issuer = await Issuer.discover(functions.config().service.discovery)
            const client = new issuer.Client({
                client_id: functions.config().service.client_id,
                client_secret: functions.config().service.client_secret,
                redirect_uris: ['http://localhost:5001/spring-care-recruitment/europe-west/oauthCb'],
                response_types: ['code'],
            });
            const tokenSet = await client.refresh(refreshToken)
            console.log("getting new token")
            return {
                accessToken:tokenSet.access_token,
                refreshToken:tokenSet.refresh_token,
                expireTime:tokenSet.expires_at
            }
        } else {
            return {
                accessToken,
                refreshToken,
                expireTime
            }
        }
    }

    // update token
    const tokenSet = await getToken()
    console.log(tokenSet)
    await put("users","")("oauth",tokenSet)

    // get user email
    const email = context.auth?.token.email
    if(!email) throw "unknown user"

    // get userinfo
    const [{displayName}] = await get("users","","id","==",email)()

    console.log(displayName,"displayName")
    // get accountinfo

    const supplier = await getSupplierApi({
        accessToken:tokenSet.accessToken,
        displayName,
        quickbooksId
    }) || await createSupplierApi({
        accessToken:tokenSet.accessToken,
        quickbooksId,
        DisplayName:displayName,
    })

    if(!supplier || supplier.length === 0){
        console.error("error finding/creating supplier")
        return null
    }
    console.log(supplier,"kkks")
    const [{
        Id
    }] = supplier

    const invoice = await createInvoiceApi({
        vendorId:Id,
        quickbooksId,
        accessToken,
        invoice:data,
    })

    return "done"
});

export const oauthCb = functions.https.onRequest(async (request,response) => {
    const issuer = await Issuer.discover(functions.config().service.discovery)
    const client = new issuer.Client({
        client_id: functions.config().service.client_id,
        client_secret: functions.config().service.client_secret,
        redirect_uris: ['http://localhost:5001/spring-care-recruitment/europe-west/oauthCb'],
        response_types: ['code'],
    });
    const params = client.callbackParams(request);
    console.log(params,request.query)
    functions.logger.info(params, {structuredData: true});
    const tokenSet = await client.callback("http://localhost:5001/spring-care-recruitment/europe-west/oauthCb",params,{state:params.state})

    await post("users","")({
        id:"oauth",
        accessToken:tokenSet.access_token||"",
        refreshToken:tokenSet.refresh_token||"",
        expireTime:tokenSet.expires_at||0,
        timeLeft:tokenSet.expires_in||0,
        quickbooksId:request.query.realmId as string ||""
    })
    response.end("well done")
});

export const createService = functions.https.onRequest(async (request,response) => {
    console.log(functions.config())
    const issuer = await Issuer.discover(functions.config().service.discovery)
    const client = new issuer.Client({
        client_id: functions.config().service.client_id,
        client_secret: functions.config().service.client_secret,
        redirect_uris: ['http://localhost:5001/spring-care-recruitment/europe-west/oauthCb'],
        response_types: ['code'],
    });
    const url = client.authorizationUrl({
        environment:"sandbox",
        scope: 'com.intuit.quickbooks.accounting openid',
        state:"abc123",
    });
    response.end(url)
});

async function createInvoiceApi({invoice,accessToken,quickbooksId,vendorId}:{invoice:InvoiceData,accessToken:string,quickbooksId:string,vendorId:string}){

    const lines = invoice.week.timesheets.map((f,index) => {
        return ({
            DetailType:"AccountBasedExpenseLineDetail",
            Amount:Number(Number(f.hours)*Number(f.rate)).toFixed(1),
            Id:index,
            AccountBasedExpenseLineDetail: {
                AccountRef: {
                    value:"45"
                }
            }
        })
    })
    const payload = {
        Line:lines,
        VendorRef: {
            value:vendorId,
        }
    }

    try {
        const {data:invoiceData,status} = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${quickbooksId}/bill`,payload,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        })
        console.log(invoiceData,"\n",status)
        return invoiceData
    } catch (e) {
        console.log(e.response,"\n\n",JSON.stringify(e.response.data))
        return null
    }
}

async function getSupplierApi({displayName,accessToken,quickbooksId}:{displayName:string,accessToken:string,quickbooksId:string}):Promise<Vendor[]|null>{
    try {
        const {data:accountData,status} = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/${quickbooksId}/query?query=select * from vendor where DisplayName = '${displayName}'`,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        })
        const {QueryResponse} = accountData
        if(!QueryResponse.Vendor){
            return null
        } else {
            return QueryResponse.Vendor
        }
    } catch (e) {
        console.log(e.response,"\n\n",JSON.stringify(e.response.data))
        return null
    }
}

async function createSupplierApi(props:CreateSupplierProps):Promise<Vendor[]|null>{
    const {accessToken,quickbooksId,...rest} = props
    console.log(`https://sandbox-quickbooks.api.intuit.com/v3/company/${quickbooksId}/vendor?minorversion=55`,"quck")
    try {
        const {data:accountData,status} = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${quickbooksId}/vendor?minorversion=55`,{
           ...rest
        },{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            },
        })
        const {QueryResponse} = accountData
        if(!QueryResponse.Vendor){
            return null
        } else {
            return QueryResponse.Vendor
        }
    } catch (e) {
        console.log(e.response,"\n\n",JSON.stringify(e.response.data))
        return null
    }
}

const post = (collection:string,lid:string) => async (data:{id:string,[key:string]:string|number}) => {

    if(!lid){
        if(Array.isArray(data)){
            const batch = firestore.batch()
            data.forEach(f => {
                batch.set(firestore.collection(cp(collection)).doc(f.id),f)
            })
            return batch.commit().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            return firestore.collection(cp(collection)).doc(data.id).set(data).then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    } else {
        if(Array.isArray(data)){
            const batch = firestore.batch()
            data.forEach(f => {
                batch.set(firestore.collection(cp(users,lid,collection)).doc(f.id),f)
            })
            return batch.commit().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            return firestore.collection(cp(users,lid,collection)).doc(data.id).set(data).then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }
}

const put = (collection:string, lid?:string) => async (id:string, data:any) => {
    if (!lid){
        return firestore.collection(cp(collection)).doc(id).update(data)
    } else {
        return firestore.collection(cp(users,lid,collection)).doc(id).update(data)
    }

}

const get = (collection:string, lid?:string, ...filter:any) => async (cb?:(data:any) => void) => {
    let col:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
    if (!lid){
        col = filter.length === 3 ?
            await firestore.collection(cp(collection)).where(filter[0],filter[1],filter[2]).get() :
            await firestore.collection(cp(collection)).get()
    } else {
        console.log(cp(users,lid,collection),"best",[users,lid,collection])
        col = filter.length === 3 ?
            await firestore.collection(cp(users,lid,collection)).where(filter[0],filter[1],filter[2]).get() :
            await firestore.collection(cp(users,lid,collection)).get()
    }

    const docs = col.docs.map(d => d.data())
    cb && cb(docs)
    return docs
}

function cp(...path:any[]){
    console.log(path,"lets see".replaceAll)
    return path.toString().replace(/,/g,"/")
}