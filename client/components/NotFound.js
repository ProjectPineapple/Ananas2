import React from 'react'
import {
  Header,
  Segment,
  Grid,
  Icon,
  Search,
  Divider,
  Button
} from 'semantic-ui-react'
import {withRouter} from 'react-router'

const NotFound = function({history}) {
  const handleEnter = e => {
    if (event.keyCode === 13) {
      const searchParam = event.target.value
      history.push(`/products?search=${searchParam}`)
    }
  }

  return (
    <Segment placeholder textAlign="center">
      <Header as="h1">
        Whoops Looks like you took a wrong turn at the Bermuda Triangle!
      </Header>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header icon>
              <Icon name="search" />
              Products
            </Header>

            <Search placeholder="Search products..." onKeyDown={handleEnter} />
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name="home" />
              Back to Home
            </Header>
            <Button primary onClick={() => history.push('/home')}>
              Home
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
export default withRouter(NotFound)
