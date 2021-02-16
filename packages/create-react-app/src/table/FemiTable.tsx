import {Column, useTable} from "react-table";
import {Button, InputGroup, Modal, Table, Form, Dropdown} from "react-bootstrap";
import React, {FC, FormEvent, Fragment, useEffect, useState} from "react";

type CreateMenu = (name:string, f:(d:any, d2?:any) => Promise<void>) => {name:string, menu:string,f:typeof f};
export function createMenu(menu:string){
    const createMenuItem : CreateMenu = (name, f) => ({f,name,menu})
    return ({
        menu,
        createMenuItem,
    })
}

interface Table2FormProps {
    inputs:any[],
    handleSubmit: (e:FormEvent<HTMLFormElement>) => Promise<void>
}
interface Table2Props {
    cols:any[],
    cols2?:ReturnType<CreateMenu>[],
    get: () => Promise<any[]>
    put?: (id:string,data?:any) => Promise<any>
    update?:boolean
    del?: (id:string) => Promise<any>
    post?: (data?:any) => Promise<any>
    form: FC<{data:any, cleanup:()=>void}>
    tableStyle?: ("responsive"|"striped"| "bordered" |"hover" )[]
}


export function FemiTable({get,cols,put,del,post,form,update=true,cols2,tableStyle}:Table2Props){
    const [_cols, _setCols] = useState<any[]>([])
    const [editing,setEditing] = useState<null|any>(null)
    const [viewing,setViewing] = useState<null|any>(null)
    const [data,setData] = useState<any[]>([])
    const [formState,setFormState] = useState<"none"|"open">("none")
    const [title,setTitle] = useState<"edit"|"view"|"create"|null>(null)
    const setFormStateOpen = () => setFormState("open")
    const setFormStateNone = () => setFormState("none")
    const refreshData = () => get().then((f) => {
        setData(f)
    })
    const CrudForm = form
    const _tableStyle = tableStyle?.reduce((v,f) => ({...v,[f]:true}),{})

    async function onFormClose(){
        if(editing){
            await put?.(editing.id,{editing:false})
        }
        if(viewing){
            await put?.(viewing.id,{viewing:false})
        }
        setFormStateNone()
        refreshData()
    }

    useEffect(function () {
        refreshData()
    },[])

    const menu = createMenu("manage")
    const crudCells = [
        ... put ? [menu.createMenuItem("view",async (d) => {
            await put?.(d.id,{viewing:true})
            await refreshData()
        })] : [],
        ... put && update ? [menu.createMenuItem("edit",async (d) => {
            await put?.(d.id,{editing:true})
            await refreshData()
            setFormStateOpen()
        })] : [],
        ... del ? [menu.createMenuItem("delete",async (d) => {
            await del(d.id)
            await refreshData()
        })] : [],
    ].concat(...(cols2 ? cols2 : []))


    useEffect(() => {
        if(formState === "open"){
            if(editing){
                setTitle("edit")
            } else {
                setTitle("create")
            }
        }
    },[editing,formState])

    useEffect(() => {
        const crudCols = (put || del || post) ? ({
            Header:"Manage",
            columns: [
                {
                    Header:() => post ? <Button onClick={setFormStateOpen}>Add</Button> : <span></span>,
                    accessor:"add-bilsling",
                    Cell: (d:any) => (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {[...new Set(crudCells.map(f => f.menu))].map((f,index) => (
                                    <Fragment key={index}>
                                        <Dropdown.Header>{f}</Dropdown.Header>
                                        {crudCells.filter(c => c.menu === f).map((c) => (
                                            <Dropdown.Item
                                                key={c.name}
                                                as="button"
                                                onClick={async () => {
                                                    await c.f(d.row.original)
                                                }}
                                            >
                                                {c.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Fragment>
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }
            ]
        }) : []
        _setCols(cols.concat(crudCols))
        setEditing(data.find(f => f.editing))
        setViewing(data.find(f => f.viewing))
    },[JSON.stringify(data)])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        data,
        columns:_cols
    })

    return (
        <>
            <Table {..._tableStyle} {...getTableProps()}>
                <thead>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal show={!!editing || !!viewing || formState === "open"} onHide={onFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CrudForm data={editing || viewing} cleanup={async () => {
                        setFormStateNone()
                        refreshData()
                    }} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onFormClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}