import React, {Component, FC, useEffect} from "react"
import {Button, Card, Col, ColProps, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import BusinessJumbo from "./BusinessJumbo";
import ReactPlaceholder from "react-placeholder";
import {css} from "@emotion/react";


export interface BusinessTileProps {
    /**
     * Is this the principal call to action on the page?
     */
    inverse?:boolean
    title?:FC
    description?:string
    padding?:{top?:string,bottom?:string}
    icon?:() => JSX.Element
    subTitle?:FC
    testament?:string
    author?:string
    colProps?:ColProps
    footer?:FC
    className?:string
}

/**
 * Business Header Component
 */
export function BusinessTile(props:BusinessTileProps){
    const {
        padding={},
        icon,
        title,
        subTitle,
        testament,
        description,
        author,
        colProps,
        footer,
        className
    } = props

    const styles = {
        container: css({
            ...(padding?.top && {paddingTop:padding.top}),
            ...(padding?.bottom && {paddingBottom:padding.bottom})
        })
    }

    const TextColumn = () => (
        <Col {...colProps}>
            {(icon || title) && (
                <Row>
                    <Col>
                        {icon && (
                            <div className="d-inline-block ss" css={{fontSize:32}}>
                                {icon()}&nbsp;
                            </div>
                        )}
                        {title && (
                            <div className="d-inline-block">
                                {title({})}
                            </div>
                        )}
                    </Col>
                </Row>
            )}
            <BusinessJumbo
                description={description}
                title={subTitle}
            />
            {testament && (
                <Row>
                    <Col>
                        <Card bg="light" border="light" className="mt-4">
                            <Card.Body css={{padding:".75rem"}}>
                                <blockquote className="blockquote mb-0">
                                    <p style={{lineHeight:"20px"}}>
                                        <em style={{fontSize:"1rem"}} className="mb-0">{testament}</em>
                                    </p>
                                    <footer className="blockquote-footer" css={{"&:before":{content:`""`}}}>
                                        <div className="d-inline-block align-middle">
                                            <ReactPlaceholder ready={false} type="media" rows={0}>{}</ReactPlaceholder>
                                        </div>
                                        <div className="d-inline-block">
                                            <strong className="text-dark" style={{fontSize:13}}>| {author}</strong>
                                        </div>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Col>
    )

    return (
        <>
            <Row className={className || ""} css={styles.container}>
                <TextColumn/>
            </Row>
            {footer && (
                <Row className={`pt-3`}>
                    <Col>
                        {footer({})}
                    </Col>
                </Row>
            )}
        </>

    )
}


export default BusinessTile