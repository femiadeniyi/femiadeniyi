import React, {FC, PropsWithChildren, useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row, Image} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import classnames from "classnames"
import {css} from "@emotion/react";

export interface BusinessJumboProps {
    /**
     * Is this the principal call to action on the page?
     */
    bg?:string
    justifyContainer?:"center"|"start"|"end"
    justifyContent?:boolean
    padding?: {top:string,bottom:string}
    title?:string
    description?:string
}

export function BusinessJumbo(props:PropsWithChildren<BusinessJumboProps>) {
    const {
        children,
        title,
        bg,
        justifyContainer="start",
        justifyContent=false,
        padding,
        description,
    } = props

    console.log(padding,"paddo")

    const classes = {
        container:classnames({
            [`justify-content-${justifyContainer}`]:justifyContainer
        }),
        content: {
            col: classnames({
                "text-center":justifyContent,
            }),
            row: classnames({
                "justify-content-center":justifyContent
            }),
        }
    }
    const styles = {
        col: css({
            ...(padding?.top && {paddingTop:padding.top}),
            ...(padding?.bottom && {paddingBottom:padding.bottom})
        })
    }
    return (
        <Row
            className={`${classes.container} mt-4`}
            style={{
                background:bg || "initial"
            }}
        >
            <Col className={classes.content.col} css={styles.col}>
                <Row>
                    <Col>
                        <div className="d-inline-block">
                            <h1 className="font-weight-bold mb-3" style={{fontSize:"2.5rem"}}>{title}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="m-0">{description}</p>
                    </Col>
                </Row>
                {children && (
                    <Row className="justify-content-center">
                        {children}
                    </Row>
                )}
                <Row className={`${classes.content.row} pt-3`}>
                    <Col>
                        <Button className="font-weight-bold p-0" variant="link" as="a">Find out more</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default BusinessJumbo