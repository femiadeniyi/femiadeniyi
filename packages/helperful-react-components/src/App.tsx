import React, {useEffect, useState} from 'react';
import RouterComponent, {createRoutes} from "./components/RouterComponent";

function App() {

    const routes = createRoutes(["Business"])
    console.log(routes)


    return (
        <RouterComponent
            routes={routes}
            importFn={(file) => import(`./pages/${file}`)}
            logo={{type:"image",value:"Helpful Components"}}
        />
    )

}

export default App;
