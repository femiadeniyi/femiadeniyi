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
            <div className="row justify-content-center position-relative py-5">
                <div className="row position-absolute" css={{background: "#0077cc",left:0,top:0,right:0}}>
                    <div className="col">
                        <div css={{paddingTop:"15rem"}}></div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        <div className={"col-md-5  text-white"}>
                            <div className="row">
                                <div className="col">
                                    <h1 className={"w-50"} css={{fontWeight: 800}}>Open and Transparent</h1>
                                </div>
                            </div>
                            <div className="row text-dark" css={{paddingTop:"8rem"}}>
                                <div className="col">
                                    <p css={{lineHeight:"26px"}}>Working in an open and transparent environment is a recipe for good working relationships which ensures an expected end product without surprises. It's natural for changes to occur along the way but transparency between all parties involved allows for them to be handled gracefully with minimal impact. I work in an Agile Scrum manner which enables this modern way of working. I take steps to achieve even greater transparency by using and relying on industry platforms so everything I build can be easily replicated and this is my preferred way of working. This puts ownership back in user hands and ensures no vendor lock in as I build solutions on industry platforms accessible anyone. </p>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-4 offset-md-2"}>
                            <div className="card">
                                <div className="card-body">
                                    <h3 css={{fontWeight:800}} className={"text-center pb-3"}>Register to listen</h3>
                                    <p className={"pb-2"}>You'll also receive updates via email</p>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        setErrors(prevState => [...prevState, "transparency-content"])
                                    }}>
                                        {
                                            [
                                                {
                                                    label:"Email address",
                                                    type:"email",
                                                },
                                                {
                                                    label:"First name",
                                                    type:"text",
                                                },
                                                {
                                                    label:"Last name",
                                                    type:"text",
                                                }
                                            ].map(f => (
                                                <div className="mb-3">
                                                    <strong><label htmlFor="exampleInputEmail1" className="form-label">{f.label}</label></strong>
                                                    <input type={f.type} className="form-control" id="exampleInputEmail1"
                                                           aria-describedby="emailHelp"/>
                                                </div>
                                            ))
                                        }
                                        <button type="submit" className="btn btn-primary btn-block">Listen now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                errors.includes("transparency-content") && (
                    <div className="row ">
                        <div className="col">
                            <div className="alert alert-danger mb-0" role="alert">
                                Sorry that content is not ready yet.
                            </div>
                        </div>
                    </div>
                )
            }

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