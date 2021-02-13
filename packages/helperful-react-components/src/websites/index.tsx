import React from "react"
import ReactDOMServer, {renderToString} from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance'
import Business from "../pages/Business";
import fs from "fs"
import fse from "fs-extra"
import path from "path"
import { renderStylesToString } from '@emotion/server'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

const key = 'custom'

document.addEventListener('DOMContentLoaded', async () => {
    const cache = createCache({ key,container:document.head })
    const { extractCritical } = createEmotionServer(cache)
    console.log(document.head.innerHTML)
    let element = (
        <Business />
    )

    let { html, css, ids } = extractCritical(renderToString(element))

    const res = `
        <html>
        <head>${document.head.innerHTML}</head>
        <body>
        ${html}
</body>
        
</html>
    `
    // Render
    console.log(css,"hell",ids,`<style data-emotion="${key} ${ids.join(' ')}">${css}</style>`)
    fse.outputFileSync(path.resolve("./business/index.html"),res)
})



// const html = renderStylesToString(renderToString(<p>Hello</p>))
// const businessWebsite = ReactDOMServer.renderToStaticMarkup(<Business />)
//

