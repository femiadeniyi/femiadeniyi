import React, {FormEvent, useEffect, useState} from "react"
import {Row, Container, Form, InputGroup, FormControl, Button, Spinner} from "react-bootstrap";
import firebase from "firebase/app";
import "../firebase/firebase"
import "firebaseui/dist/firebaseui.css"
import Timesheets from "./Timesheets";


const firestore = window.femiFirestore
const auth = window.femiAuth
const authUi = window.femiAuthUi
const createCrud = window.femiCreateCrud

export default function Login(){
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


    if (authorisation === "authorised") return <Timesheets />
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