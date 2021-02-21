import React, {useContext, useEffect} from "react";
import {FemiTable} from "../table/FemiTable";
import {createComp, createFields, createFormInputs, createHandleSubmit, FemiForm} from "../forms/FemiForm";
import {FormControl} from "react-bootstrap";
import appContext from "../appContext";


function Account(){

    const context = useContext(appContext)

    const fbApp = context.find(f => f.name === "spring")
    if(!fbApp) throw "unknown fbApp"

    const {
        firestore:{
            createCrud
        },
        auth
    } = fbApp

    const {
        get,put,post,del
    } = createCrud("account",auth.currentUser?.email || "")


    const cols = [
        {
            Header: 'Account',
            columns: [
                {
                    Header:"First Name",
                    accessor:"firstName",
                },
                {
                    Header:"Last Name",
                    accessor:"lastName",
                },
            ],
        }
    ]

    const fields = createFields([
        "firstName",
        "lastName",
    ],{allRequired:true})

    const formConfig = {
        inputs:createFormInputs(fields),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post(data)
                window.location.reload()
            },
            async onEdit(data){
                await put(data.id, data)
            },
        })
    }


    return (
        <FemiTable
            tableStyle={["responsive","hover"]}
            cols={cols}
            get={get}
            post={post}
            form={
                ({data,cleanup}) => <FemiForm data={data} cleanup={cleanup} {...formConfig} />
            }
        />
    )
}

export default Account