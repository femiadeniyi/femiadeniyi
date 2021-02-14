import React, {Component, FC, PropsWithChildren, useEffect} from "react"
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
    padding?: {top?:string,bottom?:string}
    title?:FC
    description?:FC
    footer?:string
    subContainer?:FC,
    className?:string
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
        footer,
        subContainer,
        className,
    } = props

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
            className={`${classes.container} ${className || ""}`}
            style={{
                background:bg || "initial"
            }}
        >
            {subContainer && (
                subContainer({})
            )}
            <Col className={classes.content.col} css={styles.col}>
                {title && (
                    <Row>
                        <Col>
                            <div className="d-inline-block">
                                {title({})}
                            </div>
                        </Col>
                    </Row>
                )}
                {description && (
                    description({})
                )}
                {children && (
                    <>
                        {children}
                    </>
                )}
                {footer && (
                    <Row className={`${classes.content.row} pt-3`}>
                        <Col>
                            <Button className="font-weight-bold p-0" variant="link" as="a">{footer}</Button>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    )
}

export default BusinessJumbo