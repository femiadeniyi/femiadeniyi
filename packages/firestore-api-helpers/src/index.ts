import firebase from "firebase";

type PostProps = {id:string, [key:string]:any}|{id:string, [key:string]:any}[]

const {
    users,
} = {
    users:"users",
}

declare global {
    export interface Window {
        firestore: firebase.firestore.Firestore
    }
}

export function createApi(firestore?:firebase.firestore.Firestore){

    let _firestore:firebase.firestore.Firestore;

    if(!firestore) {
        _firestore = window.firestore
    } else {
        _firestore = firestore
    }

    async function getLicence(licence:any){
        const collection = await _firestore.collection(`key`).where("key","==",licence).get()
        const docs = collection.docs.map(d => d.data())
        return docs[0]
    }


    const get = (collection:string, lid?:string, ...filter:any) => async (cb?:(data:any) => void) => {
        let col:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
        if (!lid){
            col = filter.length === 3 ?
                await _firestore.collection(cp(collection)).where(filter[0],filter[1],filter[2]).get() :
                await _firestore.collection(cp(collection)).get()
        } else {
            console.log(cp(users,lid,collection),"best",[users,lid,collection])
            col = filter.length === 3 ?
                await _firestore.collection(cp(users,lid,collection)).where(filter[0],filter[1],filter[2]).get() :
                await _firestore.collection(cp(users,lid,collection)).get()
        }

        const docs = col.docs.map(d => d.data())
        cb && cb(docs)
        return docs
    }
    const put = (collection:string, lid?:string) => async (id:string, data:any) => {
        if (!lid){
            return _firestore.collection(cp(collection)).doc(id).update(data)
        } else {
            return _firestore.collection(cp(users,lid,collection)).doc(id).update(data)
        }

    }
    const post = (collection:string,lid:string) => async (data:PostProps) => {
        console.log(lid,"king")

        if(!lid){
            if(Array.isArray(data)){
                const batch = _firestore.batch()
                data.forEach(f => {
                    batch.set(_firestore.collection(cp(collection)).doc(f.id),f)
                })
                return batch.commit().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                return _firestore.collection(cp(collection)).doc(data.id).set(data).then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        } else {
            if(Array.isArray(data)){
                const batch = _firestore.batch()
                data.forEach(f => {
                    batch.set(_firestore.collection(cp(users,lid,collection)).doc(f.id),f)
                })
                return batch.commit().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                return _firestore.collection(cp(users,lid,collection)).doc(data.id).set(data).then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        }

    }
    const del = (collection:string,lid:string) => async (id:string) => {
        if(!lid){
            return _firestore.collection(cp(collection)).doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        } else {
            return _firestore.collection(cp(users,lid,collection)).doc(id).delete().then(function() {
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

    return ({
        get,
        createCrud,
        post,
        put,
        del,
        getLicence
    })
}

export default createApi

function cp(...path:any[]){
    return path.toString().replaceAll(",","/")
}