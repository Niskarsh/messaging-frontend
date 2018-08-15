
import React, { Component } from 'react'
import request from 'request-promise'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { openNotificationWithIcon as notify } from  '../../common/nortification'

const FormItem = Form.Item;

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {


        }
    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let options = {
                    withCredentials : true,
                    method: 'POST',
                    uri: 'http://localhost:3001/register',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Origin': 'http://localhost:3000/',
                        'Access-Control-Request-Method': 'POST',
                        'Access-Control-Request-Headers': 'content-type, Authorization'
                    },
                    form: {
                        emailId: values.email,
                        password: values.password,
                        firstname: values.firstName,
                        lastname: values.lastName          
                    }
            
                }
            
                request(options).then( data => {
                    
                    notify( 'success', `Signup successfull`, `Sign in now`)
                }).catch((e) => {
                    console.log (e)
                    notify( 'error', 'Signin failed', 'Invalid creds, try again')
                });
            }
        });
    }

    RegisterClickHandler = (reference) => {
        console.log("Inside")
        reference.setState({ signup: false })
    }

    checkEmailId = (rule, value, callback) => {
        let emailId = value
        if ((/\S+@[a-z]+\.[a-z]+/i).test(emailId) || emailId === "") {
            callback()
        }
        callback("Invalid Email Id")
    }

    checkNames = (rule, value, callback) => {
        let name = value
        if (!((/[^a-z]/i).test(name)) || name === "") {
            callback()
        } else {
            callback("Any part of name contains Alphabets ONLY!!!")
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Forgetting Firstname !!!' }, {
                            validator: this.checkNames
                        }],
                    })(
                        <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Forgetting Lastname !!!' }, {
                            validator: this.checkNames
                        }],
                    })(
                        <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last name" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Forgetting Email !!!' }, {
                            validator: this.checkEmailId
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Id" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Forgetting Password !!!' }, {
                            validator: this.validateToNextPassword,
                          }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('cPassword', {
                        rules: [{ required: true, message: 'Forgetting Password !!!' },, {
                            validator: this.compareToFirstPassword,
                          }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign up
          </Button>
                    <div>Signed up Already, then<p onClick={() => this.RegisterClickHandler(this.props.reference)}>Signin</p></div>
                </FormItem>
            </Form>
        )
    }




}


const Signup = Form.create()(SignUp);



export default Signup