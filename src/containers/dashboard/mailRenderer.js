import React from 'react'
import { Card, Button } from 'antd'
import request from 'request-promise'
import { openNotificationWithIcon as notify } from  '../../common/nortification'

export const MailRenderer = (props) => {
    
    
    let onClickHandler = (props) => {

        let options = {
            withCredentials : true,
            method: 'PATCH',
            uri: `${process.env.REACT_APP_API_SERVER}/auth/block/${props.from}?auth=${props.idToken}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Origin': `${process.env.REACT_APP_SERVER}/`,
                'Access-Control-Request-Method': 'PATCH',
                'Access-Control-Request-Headers': 'content-type, Authorization',
            }
    
        }
    
        request(options).then( data => {
            notify( 'success', `Successfully Blocked ${props.from}`, `Please refresh page for updated inbox`)
            props.reference.setState({});
        }).catch((e) => {
            notify( 'error', 'Unable to block' , 'Please try again')
        });

    
    }
    
    return (
        <div style={{ padding: '30px', paddingBottom:'0px', textAlign:'left' }}>
            <Card title={`From : ${props.from}`} bordered={true} hoverable={true} extra={<Button type="danger" onClick={onClickHandler.bind(props.reference, props)}>Block</Button>}>
                <h4>{`Subject : ${props.subject}`}</h4>
                <p>{`${props.content}`}</p>
            </Card>
        </div>

    )
}



