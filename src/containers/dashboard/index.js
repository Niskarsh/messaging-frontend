import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import request from 'request-promise'
import { Layout, Button, Row, Col } from 'antd';
import { openNotificationWithIcon as notify } from '../../common/nortification'
import { MailRenderer } from './mailRenderer'
import { logout } from '../../redux/actions/index'
import Compose from '../compose/index'
import './assets/index.css'

const { Header, Content } = Layout;
let wid
class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            compose: false,
            redirect: false,
            firstname: "",
            lastname: "",
            email: ""

        }
    }



    showDrawer = () => {
        let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        if (w > 1000) {
            wid = 574
        } else if (w > 768 && w <= 1000) {
            wid = 440
        } else {
            wid = w
        }
        this.setState({ compose: true })
    }

    async componentDidMount() {

        let options = {
            withCredentials: true,
            method: 'GET',
            uri: `${process.env.REACT_APP_API_SERVER}/auth/inbox?auth=${this.props.idToken}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Origin': `${process.env.REACT_APP_SERVER}/`,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-type, Authorization',
            }
        }

        await request(options).then(data => {
            if (data) {
                this.setState({ messages: JSON.parse(data) })
            }
        }).catch((e) => {
            if (JSON.parse(e.error).name == "TokenExpiredError") {
                notify('error', 'Session expired', 'PLease login again')
                this.setState({ redirect: true })

            } else {
                notify('error', 'Couldn\'t fetch mails', 'try again later')
            }
        });



        let options1 = {
            withCredentials: true,
            method: 'GET',
            uri: `${process.env.REACT_APP_API_SERVER}/auth/user?auth=${this.props.idToken}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Origin': `${process.env.REACT_APP_SERVER}/`,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-type, Authorization',
            }
        }

        await request(options1).then(data => {
            this.setState({ email: JSON.parse(data).emailId, firstname: JSON.parse(data).firstname, lastname: JSON.parse(data).lastname })
        }).catch((e) => {
            if (JSON.parse(e.error).name == "TokenExpiredError") {
                notify('error', 'Session expired', 'PLease login again')
                this.setState({ redirect: true })

            } else {
                notify('error', 'Couldn\'t fetch mails', 'try again later')
            }
        });






    }

    render() {

        return (



            this.state.redirect ? <Redirect to="/" /> : <div>
                {
                    this.state.compose? <Compose idToken={this.props.idToken} width={wid} visible={true} reference={this}/>:null
                }
                
                    <Row>
                    <Col span={9}>
                        
                        <div>
                            <Button className="commonButton" type="primary" onClick={this.showDrawer}>
                                Compose
                    </Button>
                            <Button className="commonButton" type="primary" onClick={this.props.logoutHandler.bind(this, this)}>
                                Logout
                    </Button></div></Col>
                        <Col span={15}><div>
                            {
                                this.state.messages.map((message, i) => {

                                    return (<MailRenderer key={i} idToken={this.props.idToken} from={message.senderEID} subject={message.subject} content={message.content} reference={this} />)
                                })
                            }

                        </div></Col>
                    </Row>



                </div>






        )
    }
}


const mapStateToProps = state => {
    if (state.authToken.idToken !== undefined) {
        return {
            idToken: state.authToken.idToken
        }
    } else if (localStorage.getItem("idToken")) {
        return {
            idToken: localStorage.getItem("idToken")
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: (reference) => dispatch(logout(reference))

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)