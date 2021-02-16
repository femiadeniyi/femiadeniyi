import React, {useEffect} from "react";
import {FemiTable} from "../table/FemiTable";
import {createComp, createFields, createFormInputs, createHandleSubmit, FemiForm} from "../forms/FemiForm";
import {FormControl} from "react-bootstrap";


function Timesheets(){

    const email  =window.femiAuth.currentUser?.email

    if(!email) throw "unknown users"

    const {
        get,put,post,del
    } = window.femiCreateCrud("timesheets",email)

    const cols = [
        {
            Header: 'Timesheet',
            columns: [
                {
                    Header:"Description",
                    accessor:"description",
                },
                {
                    Header:"Hours",
                    accessor:"hours",
                },
                {
                    Header:"Rate",
                    accessor:"rate",
                },
                {
                    Header:"Date",
                    accessor:"date",
                }
            ],
        }
    ]

    const fields = createFields([
        "description",
        "hours",
        "rate",
        "__datetimedate",
    ],{allRequired:true})

    const formConfig = {
        inputs:createFormInputs(fields).map(f => {
            console.log(f.uid)
            if(f.uid === "hours"){
                return ({
                    ...f,
                    Comp:createComp((props) => (
                        <FormControl {...props} type={"number"} />
                    ))
                })
            } else return f
        }),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post(data)
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
            put={put}
            update={false}
            post={post}
            form={
                ({data,cleanup}) => <FemiForm data={data} cleanup={cleanup} {...formConfig} />
            }
        />
    )
}

export default Timesheets