import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Card, Col, Container, Jumbotron, Row,} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import {AiFillGithub, AiFillGoogleCircle, GiPlatform} from "react-icons/all";
import logo from "../../assets/fa.logo.png";
import {BiSad} from "react-icons/bi";
import {GiStrongMan} from "react-icons/gi";
import {animated, useSpring} from "react-spring";

export default () => {


    return (
        <Container fluid>

            {/* TODO HEADER */}
            <Row className="justify-content-center position-relative">
                <Row className="position-absolute" style={{width: "100%", height: "100%"}}>
                    <CircleComponent alignment="align-self-start" color="#f36aa9"/>
                    <CircleComponent alignment="align-self-end" color="#7de2d1"/>
                    <CircleComponent alignment="align-self-start" color="#f36aa9"/>
                    <CircleComponent alignment="align-self-end" color="#e6ebf2"/>
                </Row>
                <Col md="auto">
                    <Jumbotron className="text-center" style={{margin: "120px 0", background: "transparent"}}>
                        <h1 className="m-3" style={{fontSize: "6.5rem", fontWeight: 900}}>Femi Adeniyi</h1>
                        <p style={{fontSize: "1.1rem", width: "60%", margin: "0 auto"}}>
                            Enterprise-grade web application services 100% powered by Google.
                        </p>
                        <p className="mt-3">
                            <Button style={{fontWeight: 600}} variant="primary">Get started</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>

            {/* TODO CARD-HEADER */}
            <Row className="justify-content-center" css={{paddingBottom: "6rem"}}>
                <Col lg={9}>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        {
                                            [
                                                {
                                                    title: "Products",
                                                    subTitle: "Take Payment",
                                                    description: "Facilitate taking payment in your app today thanks to Stripe - create online stores and marketplaces.",
                                                },
                                                {
                                                    title: "Products",
                                                    subTitle: "Pay only for what you need",
                                                    description: "No need to hire a teams anymore. Use our free powerful templates and upgrade if necessary.",
                                                },
                                                {
                                                    title: "Products",
                                                    subTitle: "Enterprise Grade",
                                                    description: "Technology that powers Google - reliable, secure and up to date with modern standards.",
                                                },
                                            ].map(({title, subTitle, description}, index) => (
                                                <Col key={`${title}-${index}`} lg={4}>
                                                    <Button className={"text-left"} as={"a"} variant={"link"}
                                                            css={{color: "initial"}}>
                                                        <Card.Title className={"text-muted"}>{title}</Card.Title>
                                                        <h3 className="mb-2">{subTitle}</h3>
                                                        <Card.Text>
                                                            {description}
                                                        </Card.Text>
                                                    </Button>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* TODO HERO-1 */}
            <Row
                style={{
                    background: "rgb(245, 247, 250)"
                }}
            >
                <Col className={"text-center"} css={{paddingTop: "6rem", paddingBottom: "6rem"}}>
                    <Row>
                        <Col>
                            <div className="d-inline-block">
                                <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>Technology used by
                                    millions</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <p className="m-0">Own your product and the code. By using open source technologies we're
                                able to take technical transparency to a better place leading to consistent quality.</p>
                        </Col>
                    </Row>
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
                    <Row className={`justify-content-center pt-3`}>
                        <Col>
                            <Button className="font-weight-bold p-0" variant="link" as="a">Find out more</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* TODO HERO-2 */}
            <Row
                className={"justify-content-center"}
            >
                <Col className={"text-center"} css={{paddingTop: "6rem"}}>
                    <Row>
                        <Col>
                            <div className="d-inline-block">
                                <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>Exphhlore. Find.
                                    Own.</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="m-0">Explore our apps and choose one that suits your case. Deploy and
                                continuously build your product based on our stack.</p>
                        </Col>
                    </Row>
                    <Row className={`justify-content-center pt-3`}>
                        <Col>
                            <Button className="font-weight-bold p-0" variant="link" as="a">Find out more</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* TODO CONTENT-1 */}
            {
                [
                    {
                        inverse: false,
                        author: "Devops Engineer",
                        title: "Google Grade Security",
                        subTitle: "Powered by Google",
                        icon: AiFillGoogleCircle,
                        css: {paddingTop: "6rem"},
                        testament: "As long as I follow Google standards, I have technical confidence in what I build 100% of the time.",
                        description: "Peace of mind - Our stack is based on Google and we closely follow their guidelines to ensure we deliver Google quality applications with ease and efficiency."
                    },
                    {
                        inverse: true,
                        author: "Software Engineer",
                        title: "Open Source",
                        subTitle: "It's Free",
                        icon: AiFillGithub,
                        css: {paddingTop: "6rem"},
                        testament: "Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer.",
                        description: "Our tools are open source which actually helps us deliver better software since we adhere to common practices and standards used by millions of other developers."
                    },
                    {
                        inverse: false,
                        author: "Web Developer",
                        title: "All Platforms",
                        subTitle: "Mobile, Desktop and Web",
                        icon: GiPlatform,
                        css: {paddingTop: "6rem", paddingBottom: "6rem"},
                        testament: "Back in the day, you coded the same site twice for mobile and web. Now we code once and it works everywhere.",
                        description: "Our tools allow us to build once for all platforms and enjoy a native experience. This comes for free with all of our templates."
                    }
                ].map((f, index) => (
                    <Row key={`${f.title}-${index}`}
                         className={`justify-content-center position-relative ${f.inverse ? "flex-md-row-reverse" : ""}`}
                         css={f.css}>
                        <Col md={!f.inverse ? {span: 3} : {span: 3, offset: 1}}>
                            <Row>
                                <Col>
                                    <div className="d-inline-block" css={{fontSize: 32}}>
                                        <f.icon/>
                                    </div>
                                    <div className="d-inline-block">
                                        <h4 className="font-weight-bold">{f.title}</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row css={{background: "initial"}}>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="d-inline-block">
                                                <h1 className="font-weight-bold mb-3"
                                                    style={{fontSize: "2.5rem"}}>{f.subTitle}</h1>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="m-0">{f.description}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card bg="light" border="light" className="mt-4">
                                        <Card.Body css={{padding: ".75rem"}}>
                                            <blockquote className="blockquote mb-0">
                                                <p style={{lineHeight: "20px"}}>
                                                    <em style={{fontSize: "1rem"}} className="mb-0">{f.testament}</em>
                                                </p>
                                                <footer className="blockquote-footer"
                                                        css={{"&:before": {content: `""`}}}>
                                                    <div className="d-inline-block align-middle">
                                                        <ReactPlaceholder ready={true} type="media" rows={0}>{}
                                                            <img src={logo} width={100} height={32}/>
                                                        </ReactPlaceholder>
                                                    </div>
                                                    <div className="d-inline-block">
                                                        <strong className="text-dark"
                                                                style={{fontSize: 13}}>| {f.author}</strong>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={!f.inverse ? {span: 4, offset: 1} : {span: 4}}>
                            <ReactPlaceholder type='media' ready={false} rows={15}>

                            </ReactPlaceholder>
                        </Col>
                    </Row>
                ))
            }

            {/* TODO HERO-2 */}
            <Row className={"justify-content-center"} css={{background: "rgb(245, 247, 250)"}}>
                <Col className={"text-center"} css={{paddingTop: "6rem"}}>
                    <Row>
                        <Col>
                            <div className="d-inline-block">
                                <h1 className="font-weight-bold mb-3" style={{fontSize: "2.5rem"}}>What started all
                                    this</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={5}>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className={"p-5"}>
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
                                                                Tired of integrating different technologies to achieve
                                                                the same result.
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
                                                                Don't solve already solved problems. Reuse solutions,
                                                                build faster. (Don't
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
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}

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