import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";

export interface MusicHeaderProps {
    /**
     * Is this the principal call to action on the page?
     */

}

/**
 * Business Header Component
 */
export function MusicHeader({}:MusicHeaderProps){

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

export default MusicHeader