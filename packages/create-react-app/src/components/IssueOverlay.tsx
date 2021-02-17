import React, {PropsWithChildren, ReactElement} from "react"
import {OverlayTrigger, Popover} from "react-bootstrap";

interface IssueOverlayProps {
    issue:string
    placement:"top"|"left"|"right"|"bottom"
}

function IssueOverlay(props:PropsWithChildren<IssueOverlayProps>) {

    const {
        issue,
        placement,
        children
    } = props

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Still in development</Popover.Title>
            <Popover.Content>
                We are aware of this issue <a href={`https://femiadeniyi.myjetbrains.com/youtrack/issue/${issue}`}>#{issue}</a>.
            </Popover.Content>
        </Popover>
    )

    return (
        <OverlayTrigger trigger="click" placement={placement} overlay={popover}>
            {children as ReactElement}
        </OverlayTrigger>
    )

}

export default IssueOverlay