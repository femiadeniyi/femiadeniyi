import React, {PropsWithChildren, ReactElement, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Image, Card, Col, Container, Form, Jumbotron, OverlayTrigger, Popover, Row,} from "react-bootstrap";
import {animated, useSpring} from "react-spring";
import {Helmet} from "react-helmet"


export default () => {
    const [errors, setErrors] = useState<("transparency-content" | "practices")[]>([])


    return (
        <div className={"container-fluid"}>

            {/*TODO SEO*/}
            <Helmet>
                <title>Femi Adeniyi | Committed</title>
            </Helmet>



            {/* TODO HEADER-INTRO */}
            <div className="row justify-content-center position-relative py-5" css={{background: "#0077cc"}}>
                <div className={"col-md-4 text-white text-center"}>
                    <h1 css={{fontWeight: 800}}>Build Anything You Want</h1>
                    <p css={{}}>
                        We are committed to creating software that solves problems for the masses. By working in an open
                        way using open source tools backed by industry standard practices, we can guarantee this.
                    </p>
                    <p>
                        Learn more about the practices we follow.
                    </p>
                </div>
            </div>

            {/*    TODO FOOTER*/}
            <div css={{background: "rgb(52, 55, 65)", color: "white"}} className={"row pt-5 pb-5"}>
                <div className={"col"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-md-3"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <h6 className={"mb-3"}>Solutions</h6>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {
                                        [
                                            {
                                                name: "ecommerce"
                                            },
                                            {
                                                name: "business"
                                            },
                                            {
                                                name: "trading"
                                            },
                                            {
                                                name: "desktop"
                                            },
                                            {
                                                name: "music"
                                            },
                                            {
                                                name: "pricing"
                                            }
                                        ].map(f => (
                                            <div><Button css={{fontSize: 12}} className={"text-white p-0"}
                                                         variant="link" as={"a"}>{f.name}</Button></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <h6 className={"mb-3"}>About</h6>
                                    {
                                        [
                                            {
                                                name: "resume"
                                            },
                                            {
                                                name: "contact"
                                            }
                                        ].map(f => (
                                            <div><Button css={{fontSize: 12}} className={"text-white p-0"}
                                                         variant="link" as={"a"}>{f.name}</Button></div>
                                        ))
                                    }
                                    <h6 className={"mb-3 mt-3"}>Resources</h6>
                                    {
                                        [
                                            {
                                                name: "documentation"
                                            },
                                            {
                                                name: "what is powered by google?"
                                            },
                                            {
                                                name: "me vs alternatives"
                                            },
                                            {
                                                name: "migrate"
                                            },
                                        ].map(f => (
                                            <div><Button css={{fontSize: 12}} className={"text-white p-0"}
                                                         variant="link" as={"a"}>{f.name}</Button></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <h4 className={"font-weight-bold mb-3"}>Stay up to date</h4>
                            <div className={"form"}>
                                <div className="align-items-center form-row">
                                    <div className={"col-sm-6 my-1"}>
                                        <label className={"form-label sr-only"} htmlFor="inlineFormInputName">
                                            Name
                                        </label>
                                        <input className={"form-control rounded-0"} type={"email"}
                                               id="inlineFormInputName"
                                               placeholder="Email address"/>
                                    </div>
                                    <div className="col my-1">
                                        <button className={"btn btn-primary rounded-0"} css={{background: "#0077cc"}}
                                                type="submit">Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"row justify-content-center"}>
                        <div className={"col-md-9"}>
                            <hr className={"text-white my-4"} css={{background: "rgb(83, 89, 102)"}}/>
                        </div>

                    </div>
                    <div className={"row justify-content-center"}>
                        <div className={"col-md-9"}>
                            <div className={"text-right"}>
                                <a css={{fontSize: 12}} className={"btn btn-link text-white p-0 "}>Sitemap</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

/* ISSUE OVERLAY */
interface IssueOverlayProps {
    issue: string
    placement: "top" | "left" | "right" | "bottom"
}

function IssueOverlay(props: PropsWithChildren<IssueOverlayProps>) {

    const {
        issue,
        placement,
        children
    } = props

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Still in development</Popover.Title>
            <Popover.Content>
                We are aware of this issue <a
                href={`https://femiadeniyi.myjetbrains.com/youtrack/issue/${issue}`}>#{issue}</a>.
            </Popover.Content>
        </Popover>
    )

    return (
        <OverlayTrigger trigger="click" placement={placement} overlay={popover}>
            {children as ReactElement}
        </OverlayTrigger>
    )
}

/* ISSUE OVERLAY */

interface CircleComponentProps {
    alignment: "align-self-start" | "align-self-center" | "align-self-end"
    color: string
    from?: any
    to?: any
    duration?: number
}

export function CircleComponent(props: CircleComponentProps) {
    const {
        alignment,
        color,
        from,
        duration,
        to
    } = props

    const s = useSpring({
        from: from || {
            height: 200,
            width: 200,
            borderRadius: 30,
            background: color
        },
        to: to || {
            borderRadius: 40
        },
        loop: {reverse: true},
        ...(duration && {config: {duration}})
    })

    return (
        <>
            <Col className={alignment}>
                <animated.div style={s}/>
            </Col>
        </>
    )

}