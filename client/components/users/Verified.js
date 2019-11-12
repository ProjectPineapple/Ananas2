import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Header, Button, Container} from 'semantic-ui-react'
import querystring from 'query-string'
import {withRouter} from 'react-router'
import {verifyUser} from '../../store/user'

const Verified = function({history, location}) {
  const {email, code} = querystring.parse(location.search)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyUser(email, code))
  }, [])
  return (
    <Container>
      <Header>You're all verified at {email}</Header>
      <Button onClick={() => history.push('/login')}>Go to Login</Button>
    </Container>
  )
}
export default withRouter(Verified)
