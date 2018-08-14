import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class SignIn extends Component {

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
            }
        });
    }

    RegisterClickHandler = (reference) => {
        console.log("Inside")
        reference.setState({ signup: true })
    }

    checkEmailId = (rule, value, callback) => {
        let emailId = value
        if ((/\S+@[a-z]+\.[a-z]+/i).test(emailId) || emailId === "") {
            callback()
        }
        callback("Invalid Email Id")
    }



    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Forgetting Email !!!' },
                        {
                            validator: this.checkEmailId
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Id" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Forgetting Password !!!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                    <div>Don't have a account<p onClick={() => this.RegisterClickHandler(this.props.reference)}>register now!</p></div>
                </FormItem>
            </Form>
        )
    }




}


const Signin = Form.create()(SignIn);


export default Signin