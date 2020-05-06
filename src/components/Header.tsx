import React from 'react'
import { Header } from '@rsksmart/rif-ui'
import { ROUTES } from 'routes'
import Login from './Login'


export default () => {
  const headerItems = [
    {
      title: 'Upload',
      to: ROUTES.UPLOAD,
    },
    {
      title: 'Download',
      to: ROUTES.DOWNLOAD,
    },
  ]

  return <Header hreflogo={ROUTES.UPLOAD} items={headerItems} login={Login} />
}
