import {animated, useSpring} from "react-spring";
import {Col} from "react-bootstrap";
import React from "react";

export interface CircleAnimationComponentProps {
    alignment:"align-self-start"|"align-self-center"|"align-self-end"
    color:string
    from?:any
    to?:any
    duration?:number
}

export function CircleAnimationComponent(props:CircleAnimationComponentProps) {
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

export default CircleAnimationComponent