import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";

interface Select2Props {
    get: () => Promise<any[]>
    defaultValue:string
    name:string
}
export default function FemiSelect({get,...rest}:Select2Props){

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        get().then(setData)
    },[])


    return (
        <Form.Control as="select" custom {...rest}>
            {data.map((f:any) => (
                <option value={`json__${JSON.stringify(f)}`}>{f.name}</option>
            ))}
        </Form.Control>
    )
}