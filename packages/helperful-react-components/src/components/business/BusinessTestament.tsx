import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row, Image} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export interface BusinessTestamentProps {
    /**
     * Is this the principal call to action on the page?
     */

}

export function BusinessTestament() {

    return (
        <Container fluid>
            <Row className="justify-content-center mt-5" style={{background:"rgb(245, 247, 250)"}}>
                <Col className="text-center" style={{padding:"6rem 0"}}>
                    <h1 className="font-weight-bold" style={{fontSize:"2.5rem"}}>Welcome to this</h1>
                    <p>123 and go</p>
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
                    <Row className="justify-content-center pt-3">
                        <Col md={2}>
                            <Button className="font-weight-bold" variant="link">Link</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}