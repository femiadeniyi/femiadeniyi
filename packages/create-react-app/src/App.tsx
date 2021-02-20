import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {FemiRouter, createRoutes} from "./router/FemiRouter";
import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/functions"
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css"

const prod = process.env.NODE_ENV === "production"


const firebaseApps = createFirebaseApps();

export const appContext = createContext(firebaseApps)


export function App() {
    const faCom = createRoutes(["App", "Committed", "Transparency"])
    const timesheetRoutes = createRoutes(["Timesheets", "Invoice", "Account","Login"]).map((f => {
        if (f.uid === "Login") {
            return ({
                ...f,
                async auth() {

                    const fbApp = firebaseApps.find(f => f.name === "spring")
                    if (!fbApp) return false

                    const {
                        auth,
                    } = fbApp
                    return new Promise<boolean>(((resolve, reject) => {
                        auth.onAuthStateChanged((user) => {
                            if (!user?.email) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        })
                    }))

                },
            })
        } else if (f.uid === "Invoice" || f.uid === "Timesheets") {
            return ({
                ...f,
                async auth() {

                    const fbApp = firebaseApps.find(f => f.name === "spring")
                    if (!fbApp) return false

                    const {
                        firestore: {
                            get
                        },
                        auth,
                    } = fbApp
                    return new Promise<boolean>(((resolve, reject) => {
                        auth.onAuthStateChanged((user) => {
                            if (!user?.email) {
                                reject(false)
                            } else {
                                get("account", user.email)().then((f: any) => {
                                    console.log(f,"jeff")
                                    if (f.length > 0) {
                                        resolve(true)
                                    } else {
                                        resolve(false)
                                    }
                                }).catch(e => {
                                    console.error(e)
                                    reject(false)
                                })
                            }
                        })
                    }))

                },
            })
        } else if (f.uid === "Account") {
            return ({
                ...f,
                async auth() {

                    const fbApp = firebaseApps.find(f => f.name === "spring")
                    if (!fbApp) return false
                    const {
                        firestore: {
                            get
                        },
                        auth,
                    } = fbApp
                    return new Promise<boolean>(((resolve, reject) => {

                        auth.onAuthStateChanged((user) => {

                            if (!user?.email) {
                                reject(false)
                            } else {
                                get("account", user.email)().then((f: any) => {
                                    if (f.length > 0) {
                                        resolve(false)
                                    } else {
                                        resolve(true)
                                    }
                                }).catch(e => {
                                    console.error(e)
                                    reject(false)
                                })
                            }

                        })
                    }))
                }
            })
        } else {
            return f
        }
    }))
    const faComAdmin = createRoutes(["Admin"])

    type AppName = "femiadeniyi.com"|"admin.femiadeniyi.com"|"timesheets.femiadeniyi.com"

    const createAppName = (name:AppName) => name

    const appConfig = [
        {
            name:createAppName("femiadeniyi.com"),
            app:() => (
                <FemiRouter
                    routes={faCom}
                    routerType={"browser"}
                    importFn={(file) => {
                        return import(`./com.fa/${file}`)
                    }}
                    logo={{type: "image", value: "fa.com"}}
                />
            ),
        },
        {
            name:createAppName("timesheets.femiadeniyi.com"),
            app:() => (
                <FemiRouter
                    routes={timesheetRoutes}
                    importFn={(file) => {
                        return import(`./com.fa.timesheet/${file}`)
                    }}
                    logo={{type: "image", value: "Timesheets"}}
                />
            )
        },
        {
            name:createAppName("admin.femiadeniyi.com"),
            app:() => (
                <FemiRouter
                    routes={faComAdmin}
                    importFn={(file) => {
                        return import(`./spa-fa.com/${file}`)
                    }}
                    logo={{type: "image", value: "fa.com Admin"}}
                />
            )
        }
    ]

    const createApp = (names:AppName[]) => {
        return appConfig.filter(f => names.includes(f.name)).map(f => (
            <f.app />
        ))
    }


    return (
        <>
            {
                createApp([
                    "timesheets.femiadeniyi.com",
                    "femiadeniyi.com"
                ])
            }
        </>
    )
}

export default App

function createFirebaseApps() {
    type PostProps = { id: string, [key: string]: any } | { id: string, [key: string]: any }[]
    const {
        users,
    } = {
        users: "users",
    }
    const config = firebaseConfig.map(f => {
        function cp(...path: any[]) {
            return path.toString().replaceAll(",", "/")
        }

        const fb = firebase.apps.length === 0 ? firebase.initializeApp(f.config, f.name) : firebase.app(f.name);
        const firestore = fb.firestore()
        const auth = fb.auth()
        const functions = fb.functions()

        if (!prod) {
            firestore.useEmulator('localhost', 8080)
            auth.useEmulator("http://localhost:9099")
            functions.useEmulator('localhost', 5001)
        }

        const get = (collection: string, lid?: string, ...filter: any) => async (cb?: (data: any) => void) => {
            let col: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
            if (!lid) {
                col = filter.length === 3 ?
                    await firestore.collection(cp(collection)).where(filter[0], filter[1], filter[2]).get() :
                    await firestore.collection(cp(collection)).get()
            } else {
                console.log(cp(users, lid, collection), "best", [users, lid, collection])
                col = filter.length === 3 ?
                    await firestore.collection(cp(users, lid, collection)).where(filter[0], filter[1], filter[2]).get() :
                    await firestore.collection(cp(users, lid, collection)).get()
            }

            const docs = col.docs.map(d => d.data())
            cb && cb(docs)
            return docs
        }
        const put = (collection: string, lid?: string) => async (id: string, data: any) => {
            if (!lid) {
                return firestore.collection(cp(collection)).doc(id).update(data)
            } else {
                return firestore.collection(cp(users, lid, collection)).doc(id).update(data)
            }

        }
        const post = (collection: string, lid: string) => async (data: PostProps) => {
            console.log(lid, "king")

            if (!lid) {
                if (Array.isArray(data)) {
                    const batch = firestore.batch()
                    data.forEach(f => {
                        batch.set(firestore.collection(cp(collection)).doc(f.id), f)
                    })
                    return batch.commit().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                } else {
                    return firestore.collection(cp(collection)).doc(data.id).set(data).then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                }
            } else {
                if (Array.isArray(data)) {
                    const batch = firestore.batch()
                    data.forEach(f => {
                        batch.set(firestore.collection(cp(users, lid, collection)).doc(f.id), f)
                    })
                    return batch.commit().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                } else {
                    return firestore.collection(cp(users, lid, collection)).doc(data.id).set(data).then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                }
            }
        }
        const del = (collection: string, lid: string) => async (id: string) => {
            if (!lid) {
                return firestore.collection(cp(collection)).doc(id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                return firestore.collection(cp(users, lid, collection)).doc(id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            }
        }


        return ({
            name: f.name,
            app: fb,
            authUi: new firebaseui.auth.AuthUI(auth),
            functions,
            auth,
            firestore: {
                app: firestore,
                get,
                put,
                post,
                del,
                createCrud: (collection: string, lid: string) => {
                    return ({
                        get: get(collection, lid),
                        put: put(collection, lid),
                        post: post(collection, lid),
                        del: del(collection, lid)
                    })
                },
            }
        })

    })
    return config
}