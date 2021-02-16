import BusinessHeader, {CircleComponent} from "./BusinessHeader";
import {BusinessTestament} from "./BusinessTestament";
import BusinessJumbo from "./BusinessJumbo";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import React from "react";
import BusinessContent from "./BusinessContent";
import {AiFillGoogleCircle,AiFillGithub} from 'react-icons/ai';
import {GiStrongMan, GiPlatform, GiPadlock} from "react-icons/gi"
import {BiSad} from "react-icons/bi"
import {BsBuilding} from "react-icons/bs"
import {BsArrowRight} from "react-icons/bs"
import BusinessCard from "./BusinessCard";
import BusinessTile from "./BusinessTile";


export function BusinessSite() {

    const menus = {
        docs: [
            {
                name:"ecommerce template"
            },
            {
                name:"business template"
            },
            {
                name:"trading template"
            },
            {
                name:"electron template"
            },
            {
                name:"music template"
            }
        ],
        moreInfo: [
            {
                name:"ecommerce"
            },
            {
                name:"business"
            },
            {
                name:"trading"
            },
            {
                name:"desktop"
            },
            {
                name:"music"
            },
            {
                name:"pricing"
            }
        ],
        resources: [
            {
                name:"documentation"
            },
            {
                name:"what is powered by google?"
            },
            {
                name:"me vs alternatives"
            },
            {
                name:"migrate"
            },
        ],
        aboutMe: [
            {
                name:"resume"
            },
            {
                name:"contact"
            }
        ]
    }

    const Header1 = ({title}: { title: string }) => (
        <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>{title}</h1>
    )

    return (
        <Container fluid>
            <BusinessHeader/>
            <BusinessJumbo
                title={() => <Header1 title={"Technology used by millions"}/>}
                description={() => (
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <p className="m-0">Own your product and the code. By using open source technologies we're able to take technical transparency to a better place leading to consistent quality.</p>
                        </Col>
                    </Row>
                )}
                padding={{top: "6rem", bottom: "6rem"}}
                bg="rgb(245, 247, 250)"
                justifyContent
                footer="Find out more"
            >
                <Row className="justify-content-center mt-5">
                    <Col md={2}>
                        <ReactPlaceholder type='media' ready={false} rows={4}>

                        </ReactPlaceholder>
                    </Col>
                    <Col md={2}>
                        <ReactPlaceholder type='media' ready={false} rows={4}>

                        </ReactPlaceholder>
                    </Col>
                    <Col md={2}>
                        <ReactPlaceholder type='media' ready={false} rows={4}>

                        </ReactPlaceholder>
                    </Col>
                    <Col md={2}>
                        <ReactPlaceholder type='media' ready={false} rows={4}>

                        </ReactPlaceholder>
                    </Col>
                </Row>
            </BusinessJumbo>
            <BusinessJumbo
                title={() => <Header1 title={"Explore. Find. Own."}/>}
                justifyContainer="center"
                justifyContent
                description={() => (
                    <Row>
                        <Col>
                            <p className="m-0">Explore our apps and choose one that suits your case. Deploy and continuously build your product based on our stack.</p>
                        </Col>
                    </Row>
                )}
                footer="Find out more"
                padding={{top: "6rem"}}
            />
            <BusinessContent
                author="Devops Engineer"
                title="Google Grade Security"
                subTitle={() => <Header1 title={"Powered by Google"}/>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem"}}
                testament="As long as I follow Google standards, I have technical confidence in what I build 100% of the time."
                description={() => (
                    <Row>
                        <Col>
                            <p className="m-0">Peace of mind - Our stack is based on Google and we closely follow their guidelines to ensure we deliver Google quality applications with ease and efficiency.</p>
                        </Col>
                    </Row>
                )}
            />
            <BusinessContent
                inverse
                author="Software Engineer"
                title="Open Source"
                subTitle={() => <Header1 title={"It's Free"}/>}
                icon={() => <AiFillGithub/>}
                padding={{top: "6rem"}}
                testament="Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer."
                description={() => (
                    <Row>
                        <Col>
                            <p className="m-0">Our tools are open source which actually helps us deliver better software since we adhere to common practices and standards used by millions of other developers.</p>
                        </Col>
                    </Row>
                )}
            />
            <BusinessContent
                author="Web Developer"
                title="All Platforms"
                subTitle={() => <Header1 title={"Mobile, Desktop and Web"}/>}
                icon={() => <GiPlatform/>}
                padding={{top: "6rem", bottom: "6rem"}}
                testament="Back in the day, you coded the same site twice for mobile and web. Now we code once and it works everywhere."
                description={() => (
                    <Row>
                        <Col>
                            <p className="m-0">Our tools allow us to build once for all platforms and enjoy a native experience. This comes for free with all of our templates.</p>
                        </Col>
                    </Row>
                )}
            />
            <BusinessJumbo
                title={() => <Header1 title={"What started all this"}/>}
                padding={{top: "6rem"}}
                bg="rgb(245, 247, 250)"
                justifyContent
            >
                <Row className="justify-content-center">
                    <BusinessCard
                        cardPadding="40px"
                        containerSpan={5}
                    >
                        <Row css={{textAlign: "left", color: "initial"}}>
                            <Col lg={5}>
                                <Row>
                                    <Col lg={2}>
                                        <BiSad css={{fontSize: 32}}/>
                                    </Col>
                                    <Col>
                                        <div className="d-inline-block align-middle">
                                            <h4 className="font-weight-bold">Tired</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={{offset: 2}}>
                                        <p>
                                            Tired of integrating different technologies to achieve the same result.
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={2} className="p-0">
                                <h3 className="text-center">+</h3>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col lg={2}>
                                        <GiStrongMan css={{fontSize: 32}}/>
                                    </Col>
                                    <Col>
                                        <div className="d-inline-block align-middle">
                                            <h4 className="font-weight-bold">DRY</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={{offset: 2}}>
                                        <p>
                                            Don't solve already solved problems. Reuse solutions, build faster. (Don't
                                            repeat yourself)
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="font-weight-bold p-0">Find out more</span>
                            </Col>
                        </Row>
                    </BusinessCard>
                </Row>

            </BusinessJumbo>
            <BusinessContent
                background={"rgb(245, 247, 250)"}
                author="QA"
                title="High Quality Codebase"
                subTitle={() => <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>Verified by
                    SonarCloud</h1>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem", bottom: "6rem"}}
                testament="Sometimes I'm not 100% confident in my code even when I'm sure it's ok. Now it's a fact!"
                description={() => (
                    <Row>
                        <Col>
                            <p className="m-0">We are serious about quality and transparency and our code is statically analysed to ensure we deliver software free of bugs and security issues. This is made publicly available.</p>
                        </Col>
                    </Row>
                )}
            />
            <Row css={{paddingTop:120,paddingBottom:120}}>
                <Col md={{span: 3, offset: 2}}>
                    <BusinessJumbo
                        title={() => <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>You can build anything</h1>}
                        justifyContainer="center"
                        description={() => (
                            <Row>
                                <Col>
                                    <p className="m-0">You're ready to fly but worried if you need technical know-how; not need. Find out how you can gain maximum reward with minimal effort.</p>
                                </Col>
                            </Row>
                        )}
                        footer="Find out more"
                    />
                </Col>
                <Col>
                    <Row>
                        <Col md={4}>
                            <BusinessTile
                                icon={() => <BsBuilding className="mb-4"/>}
                                subTitle={() => <h6 className="font-weight-bold mb-3">Follow industry practices, expect industry results</h6>}
                                description={() => (
                                    <Row>
                                        <Col>
                                            <p className="m-0">Learn more about how our way of working aligns with industry practices so you can expect the right results.</p>
                                        </Col>
                                    </Row>
                                )}
                                footer={() => <Button className="font-weight-bold p-0" variant="link" as="a">Find out
                                    more</Button>}
                            />
                        </Col>
                        <Col md={4}>
                            <BusinessTile
                                icon={() => <GiPadlock className="mb-4"/>}
                                subTitle={() => <h6 className="font-weight-bold mb-3">Enterprise Solutions</h6>}
                                description={() => (
                                    <Row>
                                        <Col>
                                            <p className="m-0">From facilitating transactions between buyers and sellers to scaling loads based on traffic. See how we're bringing enterprise solutions to everyday web apps.</p>
                                        </Col>
                                    </Row>
                                )}
                                footer={() => <Button className="font-weight-bold p-0" variant="link" as="a">Find out more</Button>}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <BusinessJumbo
                title={() => <Header1 title={"More about Femi Adeniyi"}/>}
                padding={{top: "6rem", bottom: "6rem"}}
                bg="#0077cc"
                justifyContent
                css={{color:"white"}}
                className={"position-relative overflow-hidden"}
                subContainer={() => (
                    <Row className="position-absolute" style={{width:"100%", height:"100%"}}>
                        <CircleComponent
                            alignment="align-self-start"
                            color="#7de2d1"
                            from={{height:100,width:100,borderRadius:100,background:"#7de2d1",translateX:-10, translateY:"-50%"}}
                            to={{translateX:50}}
                            duration={10000}
                        />
                        <CircleComponent
                            alignment="align-self-end"
                            color="#36b9ff"
                            from={{height:100,width:100,borderRadius:100,background:"#36b9ff",translateX:-10, translateY:"50%"}}
                            to={{translateX:50}}
                            duration={8000}
                        />
                        <CircleComponent
                            alignment="align-self-start"
                            color="#f990c6"
                            from={{height:100,width:100,borderRadius:100,background:"#f990c6",translate:"1px, -50%"}}
                            to={{translate:"40px, -30px"}}
                            duration={6000}
                        />
                    </Row>
                )}
            >
                <Row className="justify-content-center" css={{marginTop:64}}>
                    <Col md={3}>
                        <BusinessTile
                            className={"text-left"}
                            title={() => <h4 className="font-weight-bold mb-3">Up to date</h4>}
                            description={() => (
                                <Row>
                                    <Col>
                                        <p className="m-0">Not only in using the latest technologies but also in modern management processes so you can understand the current and future state of your product at every step.</p>
                                    </Col>
                                </Row>
                            )}
                            footer={() => <BsArrowRight />}
                        />
                    </Col>
                    <Col md={3}>
                        <BusinessTile
                            className={"text-left"}
                            title={() => <h4 className="font-weight-bold mb-3">Committed</h4>}
                            description={() => (
                                <Row>
                                    <Col>
                                        <p className="m-0">I'm 100% committed to delivering high quality software which is why I'm strictly bound by Google infrastructure to ensure nothing less is achieved and is consistent. </p>
                                    </Col>
                                </Row>
                            )}
                            footer={() => <BsArrowRight />}
                        />
                    </Col>
                    <Col md={3}>
                        <BusinessTile
                            className={"text-left"}
                            title={() => <h4 className="font-weight-bolder mb-3">Transparency</h4>}
                            description={() => (
                                <Row>
                                    <Col>
                                        <p className="m-0">I believe in working in a complete transparent environment which why I'm strong user of open source tools and publicising processes for better working relationships.</p>
                                    </Col>
                                </Row>
                            )}
                            footer={() => <BsArrowRight />}
                        />
                    </Col>
                </Row>
            </BusinessJumbo>
            <Row css={{background:"rgb(52, 55, 65)",color:"white"}} className={"pt-5 pb-5"}>
                <Col>
                    <Row className={"justify-content-center"}>
                        <Col md={3}>
                            <Row>
                                <Col>
                                    <h6 className={"mb-3"}>Solutions</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {menus.moreInfo.map(f => (
                                        <div><Button css={{fontSize:12}} className={"text-white p-0"} variant="link" as={"a"}>{f.name}</Button></div>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <Row>
                                <Col>
                                    <h6 className={"mb-3"}>About</h6>
                                    {menus.aboutMe.map(f => (
                                        <div><Button css={{fontSize:12}} className={"text-white p-0"} variant="link" as={"a"}>{f.name}</Button></div>
                                    ))}
                                    <h6 className={"mb-3 mt-3"}>Resources</h6>
                                    {menus.resources.map(f => (
                                        <div><Button css={{fontSize:12}} className={"text-white p-0"} variant="link" as={"a"}>{f.name}</Button></div>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <h4 className={"font-weight-bold mb-3"}>Stay up to date</h4>
                            <Form>
                                <Form.Row className="align-items-center">
                                    <Col sm={6} className="my-1">
                                        <Form.Label htmlFor="inlineFormInputName" srOnly>
                                            Name
                                        </Form.Label>
                                        <Form.Control className={"rounded-0"} type={"email"} id="inlineFormInputName" placeholder="Email address" />
                                    </Col>
                                    <Col xs="auto" className="my-1">
                                        <Button className={"rounded-0"} css={{background:"#0077cc"}} type="submit">Submit</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col md={9}>
                            <hr className={"text-white my-4"} css={{background:"rgb(83, 89, 102)"}}/>
                        </Col>

                    </Row>
                    <Row className={"justify-content-center"}>
                        <Col md={9}>
                            <div className={"text-right"}><Button css={{fontSize:12}} className={"text-white p-0 "} variant="link" as={"a"}>Sitemap</Button></div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

// md={!inverse ? {span:3} : {span:3,offset:1}}
export default BusinessSite