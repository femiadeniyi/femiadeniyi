import React, {PropsWithChildren, useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import BusinessJumbo from "./BusinessJumbo";
import ReactPlaceholder from "react-placeholder";
import {css} from "@emotion/react";


export interface BusinessCardProps {
    /**
     * Is this the principal call to action on the page?
     */
    containerSpan?:number
    cardPadding?:string
}

/**
 * Business Header Component
 */
export function BusinessCard(props:PropsWithChildren<BusinessCardProps>){

    const {
        containerSpan=9,
        cardPadding,
        children
    } = props

    const styles = {
        cardBody: css({
            ...(cardPadding && {padding:cardPadding}),
        })
    }

    return (
        <Col lg={containerSpan}>
            <Row>
                <Col>
                    <Card>
                        <Card.Body css={styles.cardBody}>
                            {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}


export default BusinessCard