import React, {useContext, useEffect} from "react";
import {FemiTable} from "../table/FemiTable";
import {createComp, createFields, createFormInputs, createHandleSubmit, FemiForm} from "../forms/FemiForm";
import {FormControl} from "react-bootstrap";
import {appContext} from "../App";


function App() {

    const context = useContext(appContext)

    const fbApp = context.find(f => f.name === "spring")
    if (!fbApp) throw "unknown fbApp"

    const {
        firestore: {
            createCrud
        },
        auth
    } = fbApp

    const email = auth.currentUser?.email

    if (!email) throw "unknown users"

    const {
        get, put, post, del
    } = createCrud("timesheets", email)

    const getTimesheetApp = async () => {
        const data = await get()
        return data.filter(f => !f.submitted)
    }

    const cols = [
        {
            Header: 'Timesheet',
            columns: [
                {
                    Header: "Description",
                    accessor: "description",
                },
                {
                    Header: "Address",
                    accessor: "address",
                },
                {
                    Header: "Date Worked",
                    accessor: "date",
                },
                {
                    Header: "Hours",
                    accessor: "hours",
                },
                {
                    Header: "Rate/Flat Rate",
                    accessor: "rate",
                },
            ],
        }
    ]

    const fields = createFields([
        "address",
        "description",
        "hours",
        "rate",
        "__datetimedate",
    ], {allRequired: true})

    const formConfig = {
        inputs: createFormInputs(fields).map(f => {
            console.log(f.uid)
            if (f.uid === "hours" || f.uid === "rate") {
                return ({
                    ...f,
                    Comp: createComp((props) => (
                        <FormControl {...props} type={"number"} step={.01}/>
                    ))
                })
            } else return f
        }),
        handleSubmit: createHandleSubmit({
            async onCreate(data) {
                await post(data)
            },
            async onEdit(data) {
                await put(data.id, data)
            },
        })
    }


    return (
        <>
            <div className="btn btn-primary" onClick={async () => {
                const data = await get()
                Promise.all(data.map(f => {
                    return del(f.id)
                })).then(() => window.location.reload())
            }}>
                Reset
            </div>
            <FemiTable
                tableStyle={["responsive", "hover"]}
                cols={cols}
                get={getTimesheetApp}
                put={put}
                update={false}
                post={post}
                form={
                    ({data, cleanup}) => <FemiForm data={data} cleanup={cleanup} {...formConfig} />
                }
            />
        </>
    )
}

export default App