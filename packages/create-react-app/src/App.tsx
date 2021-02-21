import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {FemiRouter, createRoutes} from "./router/FemiRouter";
import appContext from "./appContext";
import "firebaseui/dist/firebaseui.css"

const prod = process.env.NODE_ENV === "production"




export function App() {
    const firebaseApps = useContext(appContext)
    const faCom = createRoutes(["App", "Committed", "Transparency", "BuildAnything"])
    const timesheetRoutes = createRoutes(["Timesheets", "Invoice", "Account", "Login"]).map((f => {
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
                                    console.log(f, "jeff")
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

    type AppName = "femiadeniyi.com" | "admin.femiadeniyi.com" | "timesheets.femiadeniyi.com"

    const createAppName = (name: AppName) => name

    const appConfig = [
        {
            name: createAppName("femiadeniyi.com"),
            app: () => (
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
            name: createAppName("timesheets.femiadeniyi.com"),
            app: () => (
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
            name: createAppName("admin.femiadeniyi.com"),
            app: () => (
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

    const createApp = (names: AppName[]) => {
        return appConfig.filter(f => names.includes(f.name)).map(f => (
            f.app()
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
