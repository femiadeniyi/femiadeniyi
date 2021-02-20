import React, {useContext, useEffect, useState} from "react";
import {FemiTable} from "../table/FemiTable";
import {createComp, createFields, createFormInputs, createHandleSubmit, FemiForm} from "../forms/FemiForm";
import {FormControl} from "react-bootstrap";
import FemiSelect from "../forms/FemiSelect";
import { startOfISOWeek, endOfISOWeek,format } from 'date-fns'
import {appContext} from "../App";
import ReactDOMServer from "react-dom/server"

interface InvoiceDataTimesheet {
    date:string
    description:string
    rate:string
    hours:string
    address:string
}
interface InvoiceData {
    name:string
    timesheets:InvoiceDataTimesheet[]
}

interface Ab {
    str:string
}

type Bg = string

function Invoice(){

    const context = useContext(appContext)



    const [timesheet,setTimesheet] = useState<InvoiceDataTimesheet[]>([])
    const [userInfo,setUserInfo] = useState<{firstName:string,lastName:string}|null>(null)

    const fbApp = context.find(f => f.name === "spring")
    if(!fbApp) throw "unknown fbApp"

    const {
        firestore:{
            createCrud,
            get,
        },
        functions,
        auth,
        authUi,
    } = fbApp

    const email  = auth.currentUser?.email

    if(!email) throw "unknown users"

    const {
        get:getAccount,
    } = createCrud("account",email)

    const getAvailableTimesheets = async () => {
        const data = await get("timesheets",email)()
        console.log(data)
        return data.filter(f => !f.submitted)
    }

    useEffect(() => {
        getAvailableTimesheets().then((f) => {
            const g = f as InvoiceDataTimesheet[]
            setTimesheet(g)
        })
        getAccount().then(([f]) => {
            setUserInfo({
                firstName:f.firstName,
                lastName:f.lastName,
            })
        })

    },[])

    const InvoicePage = (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="row pb-5">
                        <div className="col-md-4">
                            <p>{userInfo?.firstName} {userInfo?.lastName}</p>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col">
                            <p>Invoice to:</p>
                            <p>Spring Care Recruitment</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Description</th>
                                    <th scope="col">Date worked</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Rate/Flat Rate</th>
                                    <th scope="col">Hours</th>
                                    <th scope="col">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {timesheet.map(f => (
                                    <tr>
                                        <td>{f.description}</td>
                                        <td>{new Date(f.date).toLocaleDateString()}</td>
                                        <td>{f.address}</td>
                                        <td>{Number(f.rate)}</td>
                                        <td>{Number(f.hours)}</td>
                                        <td>{Number(Number(f.rate)*Number(f.hours)).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={5}></td>
                                    <td>
                                        £{
                                        timesheet
                                            .reduce((v,f) =>
                                                v+(Number(f.rate)*Number(f.hours)),0
                                            ).toFixed(2)
                                    }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="btn btn-primary" onClick={() => {
                const pw = window.open("","popup","height=400,width=800")
                pw?.document.write("<html><head><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\" integrity=\"sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z\" crossorigin=\"anonymous\"></head><body>")
                pw?.document.write(ReactDOMServer.renderToString(InvoicePage))
                pw?.document.write("</body></html>")
                pw?.document.close();
                pw?.print();
            }}>Download Invoice</div>
            {InvoicePage}
        </>
    )
}

export default Invoice