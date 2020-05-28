import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { FileWithPath } from 'types'

function formatBytes(a: number, b = 2) {
  if (a === 0) return '0 Bytes'
  const c = b < 0 ? 0 : b
  const d = Math.floor(Math.log(a) / Math.log(1024))
  return (
    `${(a / (1024 ** d)).toFixed(c)
    } ${
      ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`
  )
}

interface FileTableProps {
  acceptedFiles: FileWithPath[]
}

export default ({ acceptedFiles }: FileTableProps) => (
  <TableContainer>
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>File Name</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Size</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {acceptedFiles.map((file: FileWithPath) => (
          <TableRow key={file.path}>
            <TableCell component="th" scope="row">
              {file.path}
            </TableCell>
            <TableCell align="right">{file.type}</TableCell>
            <TableCell align="right">{formatBytes(file.size)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
