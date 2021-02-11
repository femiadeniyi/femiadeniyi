import BusinessHeader from "../components/business/BusinessHeader";
import {BusinessTestament} from "../components/business/BusinessTestament";
import BusinessJumbo from "../components/business/BusinessJumbo";
import {Col, Container, Row} from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import React from "react";
import BusinessContent from "../components/business/BusinessContent";
import { AiFillGoogleCircle } from 'react-icons/ai';

export function Business() {

    return (
        <Container fluid>
            <BusinessHeader/>
            <BusinessJumbo
                title="Welcome to this"
                padding={{top:"6rem",bottom:"6rem"}}
                bg="rgb(245, 247, 250)"
                justifyContent
            >
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
            <BusinessJumbo
                title="Hi again"
                justifyContainer="center"
                justifyContent
                description="123 and go"
            />
            <BusinessContent
                author="Devops Engineer"
                title="Google Grade Security"
                subTitle="Powered by Google"
                icon={() => <AiFillGoogleCircle />}
                padding={{top:"6rem",bottom:"6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
            />
            <BusinessContent
                inverse
                author="Devops Engineer"
                title="Open Source"
                subTitle="No ads, no fees"
                icon={() => <AiFillGoogleCircle />}
                padding={{top:"6rem",bottom:"6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
            />
            <BusinessContent
                author="Devops Engineer"
                title="All Platforms"
                subTitle="No ads, no fees"
                icon={() => <AiFillGoogleCircle />}
                padding={{top:"6rem",bottom:"6rem"}}
                testament="I never have to worry about anything anymore. Everything just works all the time."
                description="Never worry about managing servers, security or anything. Leverage the years of experience behind Google to make sure your app is always on, working, secure and for free."
            />
        </Container>
    )
}
export default Business