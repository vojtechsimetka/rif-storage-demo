import React from 'react'
import { Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@rsksmart/rif-ui'

import UploadContext from 'providers/UploadProvider'
import Routes from 'views/Routes'
import Header from 'components/Header'
import { history } from 'routes'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <UploadContext.Provider>
      <Router history={history}>
        <Header />
        <Routes />
      </Router>
    </UploadContext.Provider>
  </ThemeProvider>
)

export default App
