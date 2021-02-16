import React from "react";
import {Alert, Breadcrumb, Col, Container, Nav, Row} from "react-bootstrap";

function Admin() {

    const sideMenu = [
        {
            name:"men1",
            active:true
        },
        {
            name:"men2"
        }
    ]
    return (
        <Container fluid>
            <Row css={{background: "#fff",borderBottom:"1px solid #d3dae6"}}>
                <Col>
                    <Breadcrumb listProps={{className: "bg-white mb-0"}}>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row css={{background: "#006bb4"}}>
                <Col>
                    <p className={"text-center text-white m-0 p-2"}>Email verifying</p>
                </Col>
            </Row>
            <Row>
                <Col md={2} css={{background:"#fafbfd",borderRight:"1px solid #d3dae6"}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        {sideMenu.map(f => (
                            <Nav.Link {...(f.active ? {href:`/${f.name}`} : {eventKey:f.name})}>{f.name}</Nav.Link>
                        ))}

                    </Nav>
                </Col>
                <Col md={10}>
                    <Row className={"py-4"}>
                        <Col md={{offset:1, span:10}}>
                            <h2 className={"font-weight-light"}>Welcome</h2>
                            <hr className={"py-1"} />
                        </Col>
                    </Row>
                    <Row><Col md={{offset:1, span:10}}>
                        <h4>What do you want to do?</h4>
                        <p>Get it all together</p>
                    </Col></Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin