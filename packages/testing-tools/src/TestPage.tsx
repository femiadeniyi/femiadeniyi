import test from "./test.test";
export function TestPage(){

    return (
        <button onClick={() => {
            test()
        }}>run test</button>
    )
}

export default TestPage