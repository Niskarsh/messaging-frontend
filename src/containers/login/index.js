import React, { Component } from 'react'
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom"
import Signin from './signin'
import Signup from './signup'
import { save_token } from '../../redux/actions/index'
import './assets/index.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signup: false,
            redirect: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (

            <Row>
                <Col xs={2} sm={7} md={8} lg={8} xl={9}></Col>
                <Col xs={20} sm={10} md={8} lg={8} xl={6}>{this.state.redirect ? <Redirect to="/dashboard" /> : <Card className="commonCard" title={this.state.signup ? "A Firstimer" : "Returning user"} hoverable={true}>
                    {
                        this.state.signup ? <Signup reference={this} /> : <Signin saveToken={this.props.saveToken} reference={this} />
                    }
                </Card>
                }</Col>
                <Col xs={2} sm={7} md={8} lg={8} xl={9}></Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveToken: (idToken, reference) => dispatch(save_token(idToken, reference))

    }
}



export default connect(null, mapDispatchToProps)(Login)