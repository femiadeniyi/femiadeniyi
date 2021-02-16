import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row, Table} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";

export interface TradingHeaderProps {
    /**
     * Is this the principal call to action on the page?
     */

}

/**
 * Business Header Component
 */
export function TradingHeader({}:TradingHeaderProps){

    return (
        <Container fluid>
            <Row>
                <Col md={8}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default TradingHeader