import { Switch, Route } from 'react-router-dom'
import Login from '../containers/login/index'
import Dashboard from '../containers/dashboard/index'
import Compose from '../containers/compose/index'

export const AppRoutes = () => {

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/compose" component={Compose} />
        </Switch>
    )
}