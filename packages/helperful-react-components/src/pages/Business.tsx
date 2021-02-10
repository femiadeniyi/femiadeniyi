import BusinessHeader from "../components/business/BusinessHeader";
import {BusinessTestament} from "../components/business/BusinessTestament";
import BusinessJumbo from "../components/business/BusinessJumbo";
import {Col, Row} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import React from "react";

export function Business() {

    return (
        <>
            <BusinessHeader/>
            <BusinessJumbo>
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
            </BusinessJumbo>
            <BusinessJumbo />
        </>
    )
}
export default Business