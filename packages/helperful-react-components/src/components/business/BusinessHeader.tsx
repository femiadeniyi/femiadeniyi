import React, {useEffect} from "react"
import {Button, Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {useSpring,useSprings,animated} from "react-spring";

export interface BusinessHeaderProps {
    /**
     * Is this the principal call to action on the page?
     */

}

/**
 * Business Header Component
 */
export function BusinessHeader({}:BusinessHeaderProps){

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
                        <h1 className="m-3" style={{fontSize:"6.5rem",fontWeight:900}}>Hello, world!</h1>
                        <p  style={{fontSize:"1.1rem", width:"60%", margin:"0 auto"}}>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p className="mt-3">
                            <Button style={{fontWeight:600}} variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={9}>
                    <Row>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col lg={4} className="p-0">
                                        <Card border="light" as="a" style={{color:"initial"}}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={4} className="p-0">
                                        <Card border="light" as="a" style={{color:"initial"}}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={4} className="p-0">
                                        <Card border="light" as="a" style={{color:"initial"}}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>


                            </Card.Body>
                        </Card>

                    </Row>
                </Col>

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
}
function CircleComponent({alignment,color}:CircleComponentProps) {
    const s = useSpring({
        from: {
            height:200,
            width:200,
            borderRadius:30,
            background:color
        },
        to: {
            borderRadius:40
        },
        loop:{ reverse: true },
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