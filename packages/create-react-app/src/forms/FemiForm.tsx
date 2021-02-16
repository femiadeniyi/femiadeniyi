import React, {FC, FormEvent, useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {camelCase, sentenceCase} from "change-case";
import {v4} from "uuid";

interface Form2InputProps {
    id:string
    uid:string
    type:string
    label:string
    Comp?:FC<{defaultValue:string,name:string}>
}
interface Form2Props {
    inputs:Form2InputProps[]
    handleSubmit:(data:any|any[])=>void
    data:any
    cleanup?:() => void
}

function getFormData(e:FormEvent<HTMLFormElement>){
    const stob = (s:string) => {
        if (s === "false") return false
        if (s === "true") return true
        return s
    }
    const stojson = (s:string) => {
        if(s.startsWith("json__")){
            const jsonstr = s.replaceAll("json__","")
            return JSON.parse(jsonstr)
        }
    }
    const filterValue = (s:string) => {
        if(s === "false" || s === "true") return stob(s)
        if(s.startsWith("json__")) return stojson(s)
        return s
    }
    console.log(e.currentTarget,"boll")
    const formData = new FormData(e.currentTarget)
    let data:any = {}
    for(const pair of formData.entries()){
        data[pair[0]] = filterValue(pair[1] as string)
    }
    return data
}

export function FemiForm({inputs,handleSubmit,data,cleanup}:Form2Props){
    const [options,setOptions] = useState<any>({})
    const [_inputs, _setInputs] = useState<any[]>([])
    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        const filteredInputs = inputs
            .map(mapTransformInputs)
            .filter((f:any) => f.uid !== "required__" || f.uid !== "bulk__")
        setOptions({
            ...options,
            allRequired:inputs.some(f => f.id === "required__"),
            bulk:inputs.some(f => f.id === "bulk__"),
        })
        console.log(inputs,"inputa")
        _setInputs(filteredInputs)
    },[])

    function mapTransformInputs(f:any){
        const id = f.id.replaceAll(/__|datetime/g,"")
        function getType(id:string){
            switch (id){
                case "required__":
                case "viewing__":
                case "id__":
                case "editing__": return "hidden"
                case id.includes("datetime") ? f.id : "": return "datetime-local"
                default: return "text"
            }
        }
        return ({
            ...f,
            id:camelCase(id),
            type:getType(f.id),
            label:sentenceCase(id),
        })
    }

    console.log(data,"smatx",(!options.bulk && !data))
    return (
        <Form onSubmit={async (e) => {
            setBtnDisabled(true)
            e.preventDefault()
            const data = getFormData(e)

            if (options.bulk){
                const visibleFields = _inputs.filter(f => f.type !== "hidden").filter(f => f.id !== "bulk").map(f => f.id)
                const {json,headers} = csvToJson(data.bulk)
                console.log(headers,"headers",)
                console.log(visibleFields,"visibleFields",json,"input",_inputs)
                const isMatchingFields = visibleFields.map(f => headers.some(j => j === f)).every(f => f)
                console.log(isMatchingFields,"99222")
                isMatchingFields && await handleSubmit(json)
            } else {
                await handleSubmit(data)
            }
            await cleanup?.()
        }}>
            {!data && options.bulk && (
                <Form.Group>
                    <Form.Label>Bulk</Form.Label>
                    <Form.Control as="textarea" name="bulk" />
                </Form.Group>
            )}
            {(data || !options.bulk) && _inputs.map((f:any) => (
                <Form.Group controlId={f.id} key={f.id}>
                    {f.type !== "hidden" && (<Form.Label>{f.label}</Form.Label>)}
                    {
                        f.Comp ?
                            <f.Comp
                                name={f.id}
                                defaultValue={data ? data[f.id] : ""}
                                required={options.allRequired}
                            /> :
                            <Form.Control
                                type={f.type}
                                name={f.id}
                                defaultValue={data ? data[f.id] : ""}
                                required={options.allRequired}
                            />
                    }
                </Form.Group>
            ))}
            {!data?.viewing && (
                <Button disabled={btnDisabled} variant="primary" type="submit">
                    {btnDisabled ? "Saving..." : "Submit"}
                </Button>
            )}
        </Form>
    )
}


export function createComp(createComponent:FC<{defaultValue:string, name:string}>){
    return createComponent
}

export function createFormInputs(inputs:string[]):Form2InputProps[]{
    const preserve__ = /(?<!^_*)[^A-Z0-9]+/gi
    const isMod = (f:string) => f.split(/^.*__/).length>1
    const removeMod = (f:string) => f.replaceAll(/^.*__/g,"")
    return inputs.map(f => ({
        id:f.includes("__") ? f : camelCase(f),
        input:"text",
        label: isMod(f) ? sentenceCase(removeMod(f)) : sentenceCase(f),
        type:"text",
        uid:f.toLowerCase()
    }))
}

interface CreateFormFieldsOptionProps {
    allRequired?:boolean,
    bulk?:boolean
}

export function createFields(fields:string[],options?:CreateFormFieldsOptionProps){
    return fields.concat([
        "viewing__","editing__","id__"
    ])
        .concat(options?.allRequired ? ["required__"] : [])
        .concat(options?.bulk ? ["bulk__"] : [])
}

interface CreateHandleSubmitProps {
    onCreate:(data:any) => void
    onView?:(data:any) => void
    onEdit?:(data:any) => void
}
export function createHandleSubmit({onCreate,onEdit,onView}:CreateHandleSubmitProps){
    return async function handleSubmit(data:any|any[]) {
        if(data.editing){
            await onEdit?.({...data, editing:false})
        } else
        if (data.viewing) {
            await onView?.({...data, viewing:false})
        } else {
            if(Array.isArray(data)){
                const _data = data.map(f => ({
                    ...f,
                    viewing:false,
                    editing:false,
                    id:v4(),
                }))
                await onCreate(_data)
            } else {
                await onCreate({...data, viewing:false, editing:false,id:v4()})
            }
        }
    }
}

function csvToJson(text:string){
    const csv = text.split("\n")
    const headers = csv[0].split(",").map(f => f.replaceAll(/[\t\r\n]/g,""))
    const values = csv.filter((_:any,i:number) => i !== 0).filter(f => f !== "")
    const json = values.map((f:string) => {
        const cols = f.split(",")
        return cols.reduce((v,f,i) => {
            return ({...v, [headers[i]]:f})
        },{})
    })
    return ({
        json,
        headers,
    })
}