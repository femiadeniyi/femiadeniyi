import React, {FormEvent, useContext, useEffect, useState} from "react"
import {Row, Container, Form, InputGroup, FormControl, Button, Spinner} from "react-bootstrap";
import firebase from "firebase/app";

import {appContext} from "../App";


export default function Login(){

    const context = useContext(appContext)

    const fbApp = context.find(f => f.name === "spring")
    if(!fbApp) throw "unknown fbApp"

    const {
        firestore:{
            createCrud
        },
        auth,
        authUi,
    } = fbApp

    const email  = auth.currentUser?.email


    const [authorisation, setAuthorisation] = useState<"loading" | "authorised" | "not authorised">("loading")

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                if(user.email){
                    createCrud("users","").post({
                        id:user.email,
                        displayName:user.displayName,
                        email:user.email,
                        uid:user.uid,
                    })
                }
                setAuthorisation("authorised")
            } else {
                setAuthorisation("not authorised")
            }
        })
    },[])

    useEffect(() => {
        if(authorisation === "not authorised"){
            authUi.start("#login",{
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        console.log(333444)
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        setAuthorisation("authorised")
                        createCrud("users","").post({
                            id:authResult.user.email,
                            displayName:authResult.user.displayName,
                            email:authResult.user.email,
                            uid:authResult.user.uid,
                        })
                        return true
                    },
                    uiShown: function() {
                        // The widget is rendered.
                        // Hide the loader.
                        // document.getElementById('loader').style.display = 'none';
                        setAuthorisation("not authorised")
                    }
                },
                signInOptions:[firebase.auth.EmailAuthProvider.PROVIDER_ID,]
            })
        }
    },[authorisation])


    if (authorisation === "authorised") window.location.reload()
    else
        return (
            <Container>
                <Row className="row align-items-center justify-content-center" style={{height:"100vh"}}>
                    {authorisation === "loading" && (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}
                    <div id="login"></div>
                </Row>
            </Container>
        )

}