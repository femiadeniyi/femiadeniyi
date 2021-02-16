import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";
import BusinessCard from "./BusinessCard";

export interface BusinessHeaderProps {
    /**
     * Is this the principal call to action on the page?
     */

}

/**
 * Business Header Component
 */
export function BusinessHeader({}:BusinessHeaderProps){

    const CardItem = ({title,subTitle,description}:{title:string,subTitle:string,description:string}) => (
        <Button className={"text-left"} as={"a"} variant={"link"} css={{color:"initial"}}>
            <Card.Title className={"text-muted"}>{title}</Card.Title>
            <h3 className="mb-2">{subTitle}</h3>
            <Card.Text>
                {description}
            </Card.Text>
        </Button>
    )

    return (
        <>
            <Row className="justify-content-center position-relative">
                <Row className="position-absolute" style={{width:"100%", height:"100%"}}>
                    <CircleComponent alignment="align-self-start" color="#f36aa9" />
                    <CircleComponent alignment="align-self-end" color="#7de2d1" />
                    <CircleComponent alignment="align-self-start" color="#f36aa9" />
                    <CircleComponent alignment="align-self-end" color="#e6ebf2" />
                </Row>
                <Col md="auto">
                    <Jumbotron className="text-center" style={{margin:"120px 0",background:"transparent"}}>
                        <h1 className="m-3" style={{fontSize:"6.5rem",fontWeight:900}}>Femi Adeniyi</h1>
                        <p  style={{fontSize:"1.1rem", width:"60%", margin:"0 auto"}}>
                            Enterprise-grade web application services 100% powered by Google.
                        </p>
                        <p className="mt-3">
                            <Button style={{fontWeight:600}} variant="primary">Get started</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row className="justify-content-center" css={{paddingBottom:"6rem"}}>
                <BusinessCard>
                    <Row>
                        <Col lg={4}>
                        <CardItem title={"Products"} subTitle={"Take Payment"} description={"Facilitate taking payment in your app today thanks to Stripe - create online stores and marketplaces."} />
                        </Col>
                        <Col lg={4} className="p-0">
                            <CardItem title={"Products"} subTitle={"Pay only for what you need"} description={"No need to hire a teams anymore. Use our free powerful templates and upgrade if necessary."} />

                        </Col>
                        <Col lg={4} className="p-0">
                            <CardItem title={"Products"} subTitle={"Enterprise Grade"} description={"Technology that powers Google - reliable, secure and up to date with modern standards."} />

                        </Col>
                    </Row>
                </BusinessCard>
            </Row>
        </>
    )
}

function random(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(min:number, max:number){
    let list:number[] = []
    for(let i = min; i <= max; i++){
        list.push(i)
    }
    return function (){
        if(list.length>0){
            const index = random(0,list.length-1)
            const num = list[index]
            list.splice(index,1)
            return num
        } else {
            return -1
        }
    }
}


interface CircleComponentProps {
    alignment:"align-self-start"|"align-self-center"|"align-self-end"
    color:string
    from?:any
    to?:any
    duration?:number
}
export function CircleComponent(props:CircleComponentProps) {
    const {
        alignment,
        color,
        from,
        duration,
        to
    } = props

    const s = useSpring({
        from:from ||  {
            height:200,
            width:200,
            borderRadius:30,
            background:color
        },
        to: to || {
            borderRadius:40
        },
        loop:{ reverse: true },
        ...(duration && {config:{duration}})
    })

    return (
        <>
            <Col className={alignment}>
                <animated.div style={s} />
            </Col>
        </>
    )

}

export default BusinessHeader