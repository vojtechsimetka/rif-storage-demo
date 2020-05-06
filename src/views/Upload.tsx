import React from 'react'
import Container from '@material-ui/core/Container'
import UploadFile from '../components/UploadFile'

export default () => (
  <Container>
    <h1 className="text-center mb-5">Upload new file or folder</h1>
    <UploadFile />
  </Container>
)
