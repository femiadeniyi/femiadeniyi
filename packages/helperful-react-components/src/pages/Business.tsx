import BusinessHeader, {CircleComponent} from "../components/business/BusinessHeader";
import {BusinessTestament} from "../components/business/BusinessTestament";
import BusinessJumbo from "../components/business/BusinessJumbo";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import React from "react";
import BusinessContent from "../components/business/BusinessContent";
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GiStrongMan} from "react-icons/gi"
import {BiSad} from "react-icons/bi"
import {BsArrowRight} from "react-icons/bs"
import BusinessCard from "../components/business/BusinessCard";
import BusinessTile from "../components/business/BusinessTile";

export function Business() {

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
                name:"Resume",
            },
            {
                name:"Pricing"
            }
        ],
        programmingLanguages: [
            {
                name:"rust"
            },
            {
                name:"typescript"
            },
            {
                name:"node.js"
            },
            {
                name:"golang"
            },
            {
                name:"reactjs"
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
                title={() => <Header1 title={"Welcome to this"}/>}
                description={"Hello"}
                padding={{top: "6rem", bottom: "6rem"}}
                bg="rgb(245, 247, 250)"
                justifyContent
                footer="Find out more"
            >
                <Row className="justify-content-center">
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
                title={() => <Header1 title={"Welcome to this"}/>}
                justifyContainer="center"
                justifyContent
                description="123 and go"
                footer="Find out more"
                padding={{top: "6rem"}}
            />
            <BusinessContent
                author="Devops Engineer"
                title="Google Grade Security"
                subTitle={() => <Header1 title={"Powered by Google"}/>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about where to deploy, setting up pipelines or anything. Leverage the years of experience behind Google to make sure your app gets the best."
            />
            <BusinessContent
                inverse
                author="Devops Engineer"
                title="Open Source"
                subTitle={() => <Header1 title={"Say no to Credit Card"}/>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
            />
            <BusinessContent
                author="Devops Engineer"
                title="All Platforms"
                subTitle={() => <Header1 title={"Mobile, Desktop and Web"}/>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem", bottom: "6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
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
                author="Devops Engineer"
                title="High Quality Codebase"
                subTitle={() => <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>Verified by
                    SonarCloud</h1>}
                icon={() => <AiFillGoogleCircle/>}
                padding={{top: "6rem", bottom: "6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
            />
            <Row css={{paddingTop:120,paddingBottom:120}}>
                <Col md={{span: 3, offset: 2}}>
                    <BusinessJumbo
                        title={() => <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>Build anything
                            you want</h1>}
                        justifyContainer="center"
                        description="Full stack web applications ready to be customised to your needs. Use one of our templates to get started."
                        footer="Find out more"
                    />
                </Col>
                <Col>
                    <Row>
                        <Col md={4}>
                            <BusinessTile
                                icon={() => <AiFillGoogleCircle className="mb-4"/>}
                                subTitle={() => <h6 className="font-weight-bold mb-3">Guided by industry best
                                    practices</h6>}
                                description={"We closely follow the patterns advised by Google to ensure high quality, secure and modern applications."}
                                footer={() => <Button className="font-weight-bold p-0" variant="link" as="a">Find out
                                    more</Button>}
                            />
                        </Col>
                        <Col md={4}>
                            <BusinessTile
                                icon={() => <AiFillGoogleCircle className="mb-4"/>}
                                subTitle={() => <h6 className="font-weight-bold mb-3">All solutions baked into 1</h6>}
                                description={"From taking payments online, scaling based on traffic to SEO and analytics. We have every web app needs covered."}
                                footer={() => <Button className="font-weight-bold p-0" variant="link" as="a">Find out
                                    more</Button>}
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
                            title={() => <h4 className="font-weight-bold mb-3">Extreme hard worker</h4>}
                            description={"Coding till 5 in the morning is normal. When you work with me expect satisfaction. I rely on Google to make this possible."}
                            footer={() => <BsArrowRight />}
                        />
                    </Col>
                    <Col md={3}>
                        <BusinessTile
                            className={"text-left"}
                            title={() => <h4 className="font-weight-bold mb-3">Speed is a priority</h4>}
                            description={"When it comes to technology, I make speed a priority. Working on DRY principles allows me to achieve this."}
                            footer={() => <BsArrowRight />}
                        />
                    </Col>
                    <Col md={3}>
                        <BusinessTile
                            className={"text-left"}
                            title={() => <h4 className="font-weight-bolder mb-3">Ambitious</h4>}
                            description={"My no.1 goal is to create products that help others create their own products easily and freely."}
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
                                    <h6 className={"mb-3"}>More Information</h6>
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
                                    <h6 className={"mb-3"}>Tools</h6>
                                    {menus.programmingLanguages.map(f => (
                                        <div><Button css={{fontSize:12}} className={"text-white p-0"} variant="link" as={"a"}>{f.name}</Button></div>
                                    ))}
                                    <h6 className={"mb-3 mt-2"}>Docs</h6>
                                    {menus.docs.map(f => (
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
export default Business