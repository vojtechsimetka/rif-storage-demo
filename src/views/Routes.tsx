import { IPFS_GATEWAY } from 'config'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ROUTES } from 'routes'
import NotFound from 'views/NotFound'
import Upload from 'views/Upload'



export default () => (
  <Switch>
    <Route exact path={ROUTES.DOWNLOAD} component={(props) => {
      const { match: { params: { hash } } } = props
      useEffect(
        () => {
          window.location.replace(`${IPFS_GATEWAY}/${hash}`)
        },
      )
      return <></>
    }} />
    <Route exact path={ROUTES.UPLOAD} component={Upload} />

    <Route component={NotFound} />
  </Switch>
)
