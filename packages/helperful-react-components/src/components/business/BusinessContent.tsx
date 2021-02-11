import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import BusinessJumbo from "./BusinessJumbo";
import ReactPlaceholder from "react-placeholder";
import {css} from "@emotion/react";


export interface BusinessContentProps {
    /**
     * Is this the principal call to action on the page?
     */
    inverse?:boolean
    title?:string
    description?:string
    padding?:{top?:string,bottom?:string}
    icon?:() => JSX.Element
    subTitle?:string
    testament?:string
    author?:string
}

/**
 * Business Header Component
 */
export function BusinessContent(props:BusinessContentProps){
    const {
        padding={},
        icon,
        title,
        subTitle,
        testament,
        description,
        author,
        inverse
    } = props

    const styles = {
        container: css({
            ...(padding?.top && {paddingTop:padding.top}),
            ...(padding?.bottom && {paddingBottom:padding.bottom})
        })
    }

    const TextColumn = () => (
        <Col md={!inverse ? {span:3} : {span:3,offset:1}}>
            <Row>
                <Col>
                    {icon && (
                        <div className="d-inline-block" css={{fontSize:32}}>
                            {icon()}&nbsp;
                        </div>
                    )}
                    <div className="d-inline-block">
                        <h4 className="font-weight-bold">{title}</h4>
                    </div>
                </Col>
            </Row>
            <BusinessJumbo
                description={description}
                title={subTitle}
            />
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
        </Col>
    )
    const MediaColumn = () => (
        <Col md={!inverse ? {span:4,offset:1} : {span:4}}>
            <ReactPlaceholder type='media' ready={false} rows={15}>

            </ReactPlaceholder>
        </Col>
    )
    return (
        <Row className="justify-content-center position-relative" css={styles.container}>
            {inverse ? (
                <>
                    <MediaColumn />
                    <TextColumn/>
                </>
            ) : (
                <>
                    <TextColumn/>
                    <MediaColumn />
                </>
            )}
        </Row>
    )
}


export default BusinessContent