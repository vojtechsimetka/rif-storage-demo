import React from 'react'
import { Header } from '@rsksmart/rif-ui'
import { ROUTES } from 'routes'
import Login from './Login'

export default () => {
  const headerItems = []

  return <Header hreflogo={ROUTES.UPLOAD} items={headerItems} login={Login} />
}
