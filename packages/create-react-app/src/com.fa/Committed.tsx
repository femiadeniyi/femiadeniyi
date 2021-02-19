import React, {PropsWithChildren, ReactElement, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Image, Card, Col, Container, Form, Jumbotron, OverlayTrigger, Popover, Row,} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import {FaAutoprefixer} from "react-icons/fa"
import {AiFillGithub, AiFillGoogleCircle, BiBasket, BiBrain, BiWorld, GiPlatform, SiSonarcloud} from "react-icons/all";
import {animated, useSpring} from "react-spring";
import {BsArrowRight, BsBuilding} from "react-icons/bs";
import {Helmet} from "react-helmet"
import world from "./world3.png"
import handshake from "./handshake-monochrome.svg"
import bike from "./bike.svg"


export default () => {
    const [errors, setErrors] = useState<("last-content" | "practices")[]>([])


    return (
        <div className={"container-fluid"}>

            {/*TODO SEO*/}
            <Helmet>
                <title>Femi Adeniyi | Committed</title>
            </Helmet>

            {/* TODO HEADER-INTRO */}
            <div className="row justify-content-center position-relative py-5" css={{background: "#0077cc"}}>
                <div className={"col-md-4 text-white text-center"}>
                    <h1 css={{fontWeight: 800}}>Committed</h1>
                    <p css={{}}>
                        We are committed to creating software that solves problems for the masses. By working in an open
                        way using open source tools backed by industry standard practices, we can guarantee this.
                    </p>
                    <p>
                        Learn more about the practices we follow.
                    </p>
                </div>
            </div>

            {/* TODO HEADER-READ-MORE */}
            <div className="row justify-content-center position-relative" css={{background: "#0077cc"}}>
                <div className={"col-md-9"}>
                    <div className={"row"}>
                        {
                            [
                                {
                                    name: "Code Vulnerability"
                                },
                                {
                                    name: "Type checking"
                                },
                                {
                                    name: "Agile"
                                },
                                {
                                    name: "Continuous Integration"
                                }
                            ].map((f, index, array) => (
                                <div
                                    className={`col-md-3 text-white text-left py-4 ${index === array.length - 1 ? "" : "border-right"}`}>
                                    <div className={"d-flex flex-column h-100"}>
                                        <h4 className={"pb-4 m-0 w-50 font-weight-bold"}
                                            css={{fontWeight: 800}}>{f.name}</h4>
                                        <button onClick={() => setErrors(prev => [...prev, "practices"])}
                                                className={"btn btn-link p-0 text-white text-left font-weight-bold mt-auto"}>
                                            Read more
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <div className={"row"}>
                        {
                            [
                                {
                                    name: "Auto Security Updates"
                                },
                                {
                                    name: "Monorepo"
                                },
                                {
                                    name: "Least Privilege Access"
                                },
                                {
                                    name: "Managed Services"
                                }
                            ].map((f, index, array) => (
                                <div
                                    className={`col-md-3 text-white text-left border-top py-4 ${index === array.length - 1 ? "" : "border-right"}`}>
                                    <div className={"d-flex flex-column h-100"}>
                                        <h4 className={"pb-4 m-0 w-50 font-weight-bold"}
                                            css={{fontWeight: 800}}>{f.name}</h4>
                                        <button onClick={() => setErrors(prev => [...prev, "practices"])}
                                                className={"btn btn-link p-0 text-white text-left font-weight-bold mt-auto"}>
                                            Read more
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                errors.includes("practices") && (
                    <div className="row ">
                        <div className="col">
                            <div className="alert alert-danger mb-0" role="alert">
                                Sorry that page is not ready yet.
                            </div>
                        </div>
                    </div>
                )
            }

            {/* TODO CONTENT-1 */}
            <div className="row justify-content-center position-relative py-5 overflow-hidden"
                 css={{background: `url(${world})`, backgroundPosition: "-360px 340px"}}>
                <div className={"row position-absolute"} css={{top: 0}}>
                    <div className={"col"}>
                        {/*<Image src={world} fluid css={{filter:"opacity(0.2)"}} />*/}
                    </div>
                </div>
                <div className={"col-md-9 text-center"} css={{paddingTop: "15rem", paddingBottom: "15rem"}}>
                    <h1 css={{fontWeight: 800}}>Deploy anywhere</h1>
                    <p className={"font-weight-normal"}>Any place, any time, anywhere</p>
                </div>
            </div>

            {/* TODO CONTENT-1 */}
            {
                [
                    {
                        inverse: false,
                        img: handshake,
                        subTitle: "Peace of mind",
                        css: {paddingTop: "6rem"},
                        testament: "As long as I follow Google standards, I have technical confidence in what I build 100% of the time.",
                        description: "I follow standards that are open and largely derived from successful tech giants such as Google so I have confidence in every solution I deliver. Not only do I make use of industry practices but also the very technologies created that are leading it. With this I have peace of mind knowing the tools I use are sponsored by companies well invested making applications I build more than equipped for today and the distant future."
                    },
                    {
                        inverse: true,
                        img: bike,
                        subTitle: "Next-gen",
                        css: {paddingTop: "6rem"},
                        testament: "Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer.",
                        description: "Because I'm developing and delivering software off the shoulders of giants who are leading the industry, this gives me access to the latest technical solutions. This means before many organisations are able to understand how to use such solutions to improve their business, I've already provisioned them through my existing services so you can experience its benefits at your time of convenience.  "
                    },
                ].map((f, index) => (
                    <div key={`${f.subTitle}-${index}`}
                         className={`row justify-content-center position-relative align-items-center ${f.inverse ? "flex-md-row-reverse" : ""}`}
                         css={f.css}>
                        <div className={!f.inverse ? "col-md-3" : "col-md-3 offset-md-1"}>
                            <div className={"row"} css={{background: "initial"}}>
                                <div className={"col"}>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <div className="d-inline-block">
                                                <h1 className="font-weight-bold mb-3"
                                                    style={{fontSize: "2.5rem"}}>{f.subTitle}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col>
                                            <p className="m-0">{f.description}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className={!f.inverse ? "col-md-4 offset-md-1" : "col-md-4"}>
                            <img className={"img-fluid"} src={f.img}/>
                        </div>
                    </div>
                ))
            }


            {/*    TODO CONTENT-4*/}
            <div className={`row position-relative overflow-hidden text-white`} css={{background: "#0077cc"}}>
                <div className={"col"} css={{paddingTop: "6rem", paddingBottom: "6rem"}}>
                    <div className={"row text-center"}>
                        <div className={"col"}>
                            <div className="d-inline-block">
                                <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>More of my
                                    Techniques</h1>
                                <p>Learn how I can help you build powerful web applications.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center" css={{marginTop: 64}}>
                        <div className="col-md-9">
                            <div className="row">
                                {
                                    [
                                        {
                                            name: "Automated",
                                            description: "Learn how my automated processes eliminate human error",
                                            icon: FaAutoprefixer
                                        },
                                        {
                                            name: "Philosophy",
                                            description: "Read more about my goals and driving force",
                                            icon: BiBrain
                                        },
                                        {
                                            name: "Future",
                                            description: "See our current and future products in the pipeline",
                                            icon: BiBasket
                                        }
                                    ].map(f => (
                                        <div className="col-md-4 text-center">
                                            <a className={"text-white"}
                                               onClick={() => setErrors(prevState => [...prevState, "last-content"])}>
                                                <div>
                                                    <f.icon css={{fontSize: "4rem"}}/>
                                                </div>
                                                <h3 css={{fontWeight: 800}}>{f.name}</h3>
                                                <p>{f.description}</p>
                                                <p className={"font-weight-bold"}>Learn more <BsArrowRight/></p>
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                errors.includes("last-content") && (
                    <div className="row">
                        <div className="col">
                            <div className="alert alert-danger mb-0" role="alert">
                                Sorry that page is not ready yet.
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