import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';
import Signin from './signin'
import Signup from './signup'
import './assets/index.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signup: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (

            <div>
                <Card className="commonCard" title={this.state.signup ? "A Firstimer" : "Returning user"} hoverable={true}>
                    {
                        this.state.signup ? <Signup reference={this}/> : <Signin reference={this}/>
                    }
                </Card>
            </div>
        )
    }
}




export default Login