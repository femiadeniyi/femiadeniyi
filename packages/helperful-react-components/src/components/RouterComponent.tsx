import {sentenceCase,pascalCase} from "change-case";
import React, {FC, FormEvent, lazy, ReactElement, Suspense, useEffect, useState} from "react"
import {Button, Form, Modal, Nav, Navbar, NavDropdown, Table} from "react-bootstrap";
import {Link, MemoryRouter, BrowserRouter, Route, Switch, useHistory} from "react-router-dom";

export {useHistory} from "react-router-dom";

export function createRoutes(routers:string[]){
    const createRouteObject = (f:string) => {
        let obj;

        if (f.includes("home__")) {
            const title = f.replace("home__","")
            obj = ({
                path:"/",
                title,
            })
        }
        else obj = ({
            path:`/${f}`,
            title:sentenceCase(f),
        })

        return {...obj, title:sentenceCase(obj.title), uid:f}
    }

    return routers.map(createRouteObject)
}
interface MainRouterRouteProps {
    path:string
    title:string
    uid:string
    auth?:()=>Promise<boolean>
}

interface MainRouterLogoProps {
    type:"text" | "image"
    value:string
}

interface MainRouterProps {
    routes: MainRouterRouteProps[]
    importFn: (file:string) => Promise<any>
    logo: MainRouterLogoProps
    routerType?: "browser" | "memory"
}
export function RouterComponent({routes,importFn,logo,routerType}:MainRouterProps){
    let Router:React.ElementType = routerType === "browser" ? BrowserRouter : MemoryRouter
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{logo.value}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {routes.map(({path,title,auth}) => {
                            function AuthoriseRoute(){
                                const [authorised,setAuthorised] = useState(false)

                                useEffect(() => {
                                    auth?.().then(setAuthorised)
                                },[])


                                return (
                                    <>
                                        {(!auth || (auth && authorised)) && (
                                            <Nav.Link as={"span"}>
                                                <Link to={`${path.toLowerCase()}`}>{title}</Link>
                                            </Nav.Link>
                                        )}
                                    </>
                                )
                            }
                            return (
                                <AuthoriseRoute key={title} />
                            )
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Suspense fallback={"loading"}>
                <Switch>
                    {routes.map(({path,title,uid}) => {
                        const LazyRoute = lazy(() => importFn(`${pascalCase(uid)}.tsx`))
                        return (
                            <Route key={title} path={path} component={LazyRoute} exact />
                        )
                    })}
                </Switch>
            </Suspense>
        </Router>
    )
}

export default RouterComponent