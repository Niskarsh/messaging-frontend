import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { openNotificationWithIcon as notify } from '../../common/nortification'
import request from 'request-promise'
import './assets/index.css'
const { Option } = Select;

class DrawerForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true
        };
    }


    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {

                let options = {
                    withCredentials: true,
                    method: 'POST',
                    uri: `${process.env.REACT_APP_API_SERVER}/auth/sendmessage?auth=${this.props.idToken}`,
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Origin': `${process.env.REACT_APP_SERVER}/`,
                        'Access-Control-Request-Method': 'POST',
                        'Access-Control-Request-Headers': 'Content-type',
                    },
                    form: {
                        subject: values.subject,
                        content: values.content,
                        receiverEmail: values.email
                    }

                }
                await request(options).then(data => {
                    if (!values.cc) {
                        notify('success', `Your mail was sent`, ``)
                        this.props.reference.setState({ compose: false })
                    } else {
                        let options = {
                            withCredentials: true,
                            method: 'POST',
                            uri: `${process.env.REACT_APP_API_SERVER}/auth/sendmessage?auth=${this.props.idToken}`,
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'Origin': `${process.env.REACT_APP_SERVER}/`,
                                'Access-Control-Request-Method': 'POST',
                                'Access-Control-Request-Headers': 'content-type',
                            },
                            form: {
                                subject: values.subject,
                                content: values.content,
                                receiverEmail: values.cc
                            }
        
                        }
                        request(options).then( data => {
                            notify('success', `Your mail was sent`, ``)
                            this.props.reference.setState({ compose: false })
                        }).catch((e) => {
                            notify( 'error', 'Sorry', 'Mail wasn\'t sent')
                        });

                    }
                }).catch((e) => {
                    notify('error', 'Sorry', 'Mail wasn\'t sent')
                });


            }
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.props.reference.setState({ compose: false })
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>

                <Drawer
                    title="Compose"
                    width={this.props.width}
                    placement="left"
                    onClose={this.onClose}
                    maskClosable={false}
                    visible={this.props.visible && this.state.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                <Form.Item label="To">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Forgetting Email!!!' }],
                                    })(<Input placeholder="Enter receiver's id" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

                                <Form.Item label="cc">
                                    {getFieldDecorator('cc', {
                                        rules: [{ required: false, message: 'Enter cc' }],
                                    })(
                                        <Input placeholder="CC (optional)" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Subject">
                                    {getFieldDecorator('subject', {
                                        rules: [{ required: true, message: 'Forgetting Subject!!!' }],
                                    })(
                                        <Input placeholder="Subject" />

                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Message">
                                    {getFieldDecorator('content', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'No mail without Message!!!',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="Message" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            Cancel
            </Button>
                        <Button onClick={this.handleSubmit} type="primary">Submit</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const Compose = Form.create()(DrawerForm);

export default Compose
