import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/functions"
import * as firebaseui from "firebaseui";

const prod = process.env.NODE_ENV === "production"

type PostProps = {id:string, [key:string]:any}|{id:string, [key:string]:any}[]

const {
    users,
} = {
    users:"users",
}

declare global {
    export interface Window {
        femiConfig:any,
        femiFunction:firebase.functions.Functions
        femiAuth:firebase.auth.Auth
        femiFirestore:firebase.firestore.Firestore
        femiGet:typeof get
        femiPut: typeof put
        femiDel: typeof del
        femiPost: typeof post
        femiCreateCrud: typeof createCrud
        femiAuthUi:firebaseui.auth.AuthUI
    }
}

if(!window.femiConfig) throw "firebaseConfig missing"


if(firebase.apps.length===0) {
    firebase.initializeApp(window.femiConfig );
    if(!prod){
        firebase.functions().useEmulator('localhost',5001)
        firebase.auth().useEmulator("http://localhost:9099")
        firebase.firestore().useEmulator('localhost',8080)
    }
}

window.femiFirestore = window.femiFirestore||firebase.firestore()
window.femiAuth= window.femiAuth||firebase.auth()
window.femiAuthUi = window.femiAuthUi||new firebaseui.auth.AuthUI(firebase.auth())
window.femiFunction= window.femiFunction||firebase.functions()

const firestore = window.femiFirestore


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
const put = (collection:string, lid?:string) => async (id:string, data:any) => {
    if (!lid){
        return firestore.collection(cp(collection)).doc(id).update(data)
    } else {
        return firestore.collection(cp(users,lid,collection)).doc(id).update(data)
    }

}
const post = (collection:string,lid:string) => async (data:PostProps) => {
    console.log(lid,"king")

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
const del = (collection:string,lid:string) => async (id:string) => {
    if(!lid){
        return firestore.collection(cp(collection)).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        return firestore.collection(cp(users,lid,collection)).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}

const createCrud = (collection:string, lid:string) => {
    return ({
        get:get(collection,lid),
        put:put(collection,lid),
        post:post(collection,lid),
        del:del(collection,lid)
    })
}

window.femiGet = get
window.femiPut = put
window.femiDel = del
window.femiCreateCrud = createCrud
window.femiPost = post


function cp(...path:any[]){
    return path.toString().replaceAll(",","/")
}