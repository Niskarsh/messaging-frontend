import React from 'react'
import { Card } from 'antd'

export const MailRenderer = (props) => {
    
    return (
        <div style={{ padding: '30px', paddingBottom:'0px', textAlign:'left' }}>
            <Card title={`From : ${props.from}`} bordered={true} hoverable={true}>
                <h4>{`Subject : ${props.subject}`}</h4>
                <p>{`${props.content}`}</p>
            </Card>
        </div>

    )
}

