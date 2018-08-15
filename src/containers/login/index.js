import React, { Component } from 'react'
import { Card } from 'antd';
import { connect } from 'react-redux';
import Signin from './signin'
import Signup from './signup'
import { save_token } from '../../redux/actions/index'
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
                        this.state.signup ? <Signup reference={this}/> : <Signin saveToken={this.props.saveToken} reference={this}/>
                    }
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveToken : idToken => dispatch(save_token(idToken))

    }
}



export default connect (null, mapDispatchToProps)(Login)