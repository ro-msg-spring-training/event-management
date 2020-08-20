import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { CircularProgress } from '@material-ui/core'

export class PrivateRoute extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      isAdmin: false
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({
          isLoading: false,
          isAuthenticated: true,
          isAdmin: user.signInUserSession.accessToken.payload['cognito:groups'].includes('ROLE_ADMIN')
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isAuthenticated: false,
          isAdmin: false
        })
      })
  }

  componentWillUnmount() {
    // return null when escapse component, it will no longer hold any data in memory
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          (this.state.isAuthenticated ?
            (this.props.admin && this.state.isAdmin) || (!this.props.admin && !this.state.isAdmin) ?
              <Component {...props} /> :
              <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} /> :
            this.state.isLoading ?
              <CircularProgress /> :
              <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
          )
        }
      />
    )
  }
}
