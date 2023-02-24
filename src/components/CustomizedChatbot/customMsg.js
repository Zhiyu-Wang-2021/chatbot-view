import React from 'react'
import {Card} from "@mui/material";

export default function HtmlMessage(props){
    const msg = props.payload.message.split("\n")

    return (
        <Card sx={{
            backgroundColor: 'rgba(21,101,192,0.2)',
            color: "black",
            textAlign: "left",
            fontSize: "13px",
            padding: "0px 10px 5px 10px",
            marginTop: "8px"
        }}>
            {
                msg.map((line, index) => {
                    if (line.length > 10 && line[0] === "<" && line[1] === "a") {
                        const startOfHref = line.indexOf("=") + 1
                        const endOfOpeningTag = line.indexOf(">")
                        const startOfClosingTag = line.indexOf("<", endOfOpeningTag)

                        const url = line.substring(startOfHref, endOfOpeningTag)
                        const title = line.substring(endOfOpeningTag + 1, startOfClosingTag)
                        return (
                            <h3 key={index}><a href={url}>{title}</a></h3>
                        )
                    } else {
                        return (
                            <p key={index}>{line}</p>
                        )
                    }
                })
            }
        </Card>
    )

}
