import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import RouterComponent, {createRoutes} from "./components/RouterComponent";

export function App() {
    const routes = createRoutes(["Business", "music"])
    console.log(routes)


    return (
        <RouterComponent
            routes={routes}
            importFn={(file) => import(`./pages/${file}`)}
            logo={{type: "image", value: "Helpful Components"}}
        />
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)