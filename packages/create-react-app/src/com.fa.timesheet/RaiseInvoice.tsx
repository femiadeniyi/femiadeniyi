import React, {useContext, useEffect} from "react";
import {FemiTable} from "../table/FemiTable";
import {createComp, createFields, createFormInputs, createHandleSubmit, FemiForm} from "../forms/FemiForm";
import {FormControl} from "react-bootstrap";
import FemiSelect from "../forms/FemiSelect";
import { startOfISOWeek, endOfISOWeek,format } from 'date-fns'
import {appContext} from "../App";

function RaiseInvoice(){

    const context = useContext(appContext)

    const fbApp = context.find(f => f.name === "spring")
    if(!fbApp) throw "unknown fbApp"

    const {
        firestore:{
            createCrud
        },
        functions,
        auth,
        authUi,
    } = fbApp

    const email  = auth.currentUser?.email

    if(!email) throw "unknown users"


    const {
        get:getTimesheets,
    } = createCrud("timesheets",email)

    async function getAvailableTimesheets(){
        const data = await getTimesheets()
        const now = new Date()
        const start = new Date(startOfISOWeek(now))
        const end = new Date(endOfISOWeek(now))
        const timesheets = data.filter(f => {
            const a = new Date(f.date)
            console.log(a,start,end,f)
            return a > start && a < end
        })
        return [({
            name:`${format(start,"dd/MM/yyyy")}-${format(end,"dd/MM/yyyy")}`,
            timesheets
        })]
    }

    const {
        get,put,post,del
    } = createCrud("invoices",email)

    const cols = [
        {
            Header: 'Timesheet',
            columns: [
                {
                    Header:"Week",
                    accessor:"week",
                },
            ],
        }
    ]

    const fields = createFields([
        "week",
    ],{allRequired:true})

    const formConfig = {
        inputs:createFormInputs(fields).map(f => {
            if(f.uid === "week"){
                return ({
                    ...f,
                    Comp:createComp((props) => (
                        <FemiSelect get={getAvailableTimesheets} {...props} />
                    ))
                })
            } else {
                return f
            }
        }),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                const getSupplier = functions.httpsCallable("getSupplier")
                const d = await getSupplier()
                console.log(d,data)
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

export default RaiseInvoice