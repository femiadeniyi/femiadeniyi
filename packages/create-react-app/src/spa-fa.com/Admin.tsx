import React, {useState} from "react";
import {
    Accordion,
    Alert,
    Breadcrumb,
    Button,
    Card,
    Col,
    Container,
    Form,
    Nav, Navbar,
    OverlayTrigger, Popover,
    Row
} from "react-bootstrap";
import {IoIosAnalytics} from "react-icons/io";
import {AiFillShop} from "react-icons/ai"
import {BsMusicNoteBeamed, BsBuilding} from "react-icons/bs"
import {RiMoneyEuroBoxLine} from "react-icons/ri"


import {v4} from "uuid"
import IssueOverlay from "../components/IssueOverlay";

interface ProductProps {
    name: "ecommerce" | "trading" | "music" | "business"
}

function Product(props: ProductProps) {

    const {name} = props

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Still in development</Popover.Title>
            <Popover.Content>
                We are aware of this issues and tracking it here <a href={"http://google.com"}>issue 47</a>
            </Popover.Content>
        </Popover>
    )

    const options = [
        {
            name: "online payments",
            Sub: () => (
                <Card.Text className={"text-muted m-0"} css={{fontSize: ".8rem"}}>
                    <span>Use for stores ready to receive one time payments for your products </span>
                    <IssueOverlay issue={"FA-4"} placement={"right"}>
                        <Button variant={"link"}
                                className={"p-0 d-inline"}
                                css={{
                                    fontSize: ".8rem",
                                    verticalAlign: "initial"
                                }}>
                            details
                        </Button>
                    </IssueOverlay>
                </Card.Text>
            )
        },
        {
            name: "subscription",
            Sub: () => (
                <Card.Text className={"text-muted m-0"} css={{fontSize: ".8rem"}}>
                    <span>Use for stores where your users make recurring payments subscriptions. </span>
                    <IssueOverlay issue={"FA-4"} placement={"right"}>
                        <Button variant={"link"}
                                className={"p-0 d-inline"}
                                css={{
                                    fontSize: ".8rem",
                                    verticalAlign: "initial"
                                }}>
                            details
                        </Button>
                    </IssueOverlay>
                </Card.Text>
            )
        },
        {
            name: "enterprise",
            Sub: () => (
                <Card.Text className={"text-muted m-0"} css={{fontSize: ".8rem"}}>
                    <span>For all payment solutions including transactions between buyers and sellers. </span>
                    <IssueOverlay issue={"FA-4"} placement={"right"}>
                        <Button variant={"link"}
                                className={"p-0 d-inline"}
                                css={{
                                    fontSize: ".8rem",
                                    verticalAlign: "initial"
                                }}>
                            details
                        </Button>
                    </IssueOverlay>
                </Card.Text>
            )
        }
    ]

    return (
        <>
            <Row className={"pt-4"}>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicCheckbox" className={"m-0"}>
                            {name === "ecommerce" && (
                                <>
                                    <Row>
                                        <Col>
                                            <h4 className={"pb-3"}>Select plan</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {options.map(f => (
                                            <Col md={6} className={"mb-3"}>
                                                <Card>
                                                    <Form.Check.Label htmlFor={f.name}>
                                                        <div className={"py-0"}>
                                                            <Row className={"no-gutters"} css={{background: "#f5f7fa"}}>
                                                                <Col md={1}>
                                                                    <div
                                                                        className={"h-100 d-flex align-items-center justify-content-center"}>

                                                                        <Form.Check type="radio" name={"profile"}
                                                                                    id={f.name}/>
                                                                    </div>
                                                                </Col>
                                                                <Col className={"bg-white py-2 pl-3 pr-2"}>
                                                                    <Card.Title className={"mb-1"}
                                                                                css={{fontSize: "1rem"}}>{f.name}</Card.Title>
                                                                    <f.Sub/>

                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Form.Check.Label>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr className={"py-1"}/>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            <Row>
                                <Col>
                                    <h4 className={"pb-3"}>Deploy settings</h4>
                                    <p>Choose a setting</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Accordion>
                                        <Card className={"border-0"}>
                                            <Accordion.Toggle as={Card.Header} className={"border-0 p-0"} eventKey="0">
                                                <Row>
                                                    <Col>
                                                        <Button variant={"light"} className={"w-100"}>
                                                            <Row>
                                                                <Col className={"text-left"}>
                                                                    <p>Ecommerce&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v1</p>
                                                                </Col>
                                                                <Col className={"text-right"}>
                                                                    <Button variant={"link"}>expand</Button>
                                                                </Col>
                                                            </Row>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0" className={"pt-3"}>
                                                <>
                                                    <Row>
                                                        <Col>
                                                            <h4>Site Size</h4>
                                                            <p>Please tell us of your ecommerce operations</p>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Col md={3}>
                                                                    <Card>
                                                                        <Button
                                                                            variant={"outline-dark"}>Regular</Button>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h4>Region</h4>
                                                            <p>Location of your servers</p>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Col md={3}>
                                                                    <Card>
                                                                        <Form.Control as="select" custom>
                                                                            <option>eu</option>
                                                                        </Form.Control>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h4>Version</h4>
                                                            <p>Ecommerce template version</p>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Col md={3}>
                                                                    <Card>
                                                                        <Form.Control as="select" custom>
                                                                            <option>1</option>
                                                                        </Form.Control>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr className={"py-1"}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 className={"pb-3"}>Project name</h4>
                                    <p>Can't be changed later</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control value={"project-test-1"}/>
                                </Col>
                                <Col className={"text-right"}>
                                    <IssueOverlay placement={"top"} issue={"FA-4"}>
                                        <Button variant={"primary"}>Create</Button>
                                    </IssueOverlay>
                                </Col>
                            </Row>
                        </Form.Group>

                    </Form>
                </Col>

            </Row>

        </>
    )
}

interface DevelopmentTicketProps {
    ticket: string
    issue: string
}

function DevelopmentTicket(props: DevelopmentTicketProps) {
    const {
        ticket, issue
    } = props
    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Still in development</Popover.Title>
            <Popover.Content>
                We are aware of this issues and tracking it here <a href={ticket}>issue {issue}</a>
            </Popover.Content>
        </Popover>
    )
}

function Admin() {


    const [product, setProduct] = useState<"nothing" | "ecommerce" | "trading" | "music" | "business">("nothing")

    const sideMenu = [
        {
            name: "Templates",
            href: "templates"
        },
        {
            name: "Create Template",
            href: "createTemplate",
            active: true
        }
    ]

    const products = [
        {
            name: "Ecommerce",
            description: "Deploy ecommerce infrastructure ready to facilitate online payments.",
            icon: () => (
                <AiFillShop css={{fontSize: "32px"}}/>
            ),
            onClick() {
                setProduct("ecommerce")
            }
        },
        {
            name: "Trading",
            description: "Deploy infrastructure ready for financial analysis and trading",
            icon: () => (
                <RiMoneyEuroBoxLine css={{fontSize: "32px"}}/>
            ),
            onClick() {
                setProduct("trading")
            }
        },
        {
            name: "Music",
            description: "Release your creative talent on infrastructure ready for the showbiz.",
            icon: () => (
                <BsMusicNoteBeamed css={{fontSize: "32px"}}/>
            ),
            onClick() {
                setProduct("music")
            }
        },
        {
            name: "Business",
            description: "Build your business on infrastructure designed to manage all IT functions.",
            icon: () => (
                <BsBuilding css={{fontSize: "32px"}}/>
            ),
            onClick() {
                setProduct("business")
            }
        },
    ]

    const switchProduct = () => {
        switch (product) {
            case "music":
            case "business":
            case "trading":
            case "ecommerce": {
                return Product({name: product})
            }
            default: {
                return ""
            }
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <IoIosAnalytics/>{' '}
                    Femi Adeniyi
                </Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row css={{background: "#fff", borderBottom: "1px solid #d3dae6"}}>
                    <Col>
                        <Breadcrumb listProps={{className: "bg-white mb-0"}}>
                            <Breadcrumb.Item>Cloud</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Templates
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Create</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row css={{background: "#006bb4"}}>
                    <Col>
                        <IssueOverlay issue={"FA-4"} placement={"top"}>
                            <p css={{textDecoration: "underline"}} className={"text-center text-white m-0 p-2"}>pending
                                email verification</p>
                        </IssueOverlay>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} css={{background: "#fafbfd", borderRight: "1px solid #d3dae6"}}>
                        <Nav defaultActiveKey="/createTemplate" className="flex-column">
                            {sideMenu.map(f => (
                                f.active ? <Button className={"text-left"} variant={"link"}>{f.name}</Button> :
                                    <IssueOverlay issue={"FA-4"} placement={"right"}>
                                        <Button className={"text-left"} variant={"light"}>{f.name}</Button>
                                    </IssueOverlay>

                            ))}

                        </Nav>
                    </Col>
                    <Col md={10}>
                        <Row className={"py-4"}>
                            <Col md={{offset: 1, span: 10}}>
                                <Row>
                                    <Col>
                                        <h2 className={"font-weight-light"}>Welcome</h2>
                                        <hr className={"py-1"}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>What do you want to do?</h4>
                                        <p>Get it all together</p>
                                    </Col>
                                </Row>
                                {/* Card Row */}
                                <Row>
                                    {products.map((f, index) => (
                                        <Col key={`${f.name}-${index}`}>
                                            <Card onClick={f.onClick} className="text-center align-items-stretch p-0"
                                                  as={"button"}>
                                                <Card.Body>
                                                    <div>{f.icon()}</div>
                                                    <Card.Title>{f.name}</Card.Title>
                                                    <Card.Text>
                                                        {f.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer
                                                    className="text-muted">{f.name.toLowerCase() === product ? "selected" : "select"}</Card.Footer>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                {switchProduct()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Admin