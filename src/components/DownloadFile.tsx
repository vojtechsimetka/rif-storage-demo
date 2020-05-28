import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TextField from '@material-ui/core/TextField'
import { IPFS_GATEWAY } from 'config'

export default () => {
  const [hash, setHash] = useState<string|undefined>()
  return (
    <div className="text-right">
      <TextField
        aria-label="Hash"
        aria-describedby="basic-addon2"
        name="hash"
        onChange={(e) => setHash(e.target.value)}
        autoComplete="off"
        autoFocus
        required
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!hash}
        startIcon={<CloudDownloadIcon />}
        href={`${IPFS_GATEWAY}/${hash}`}
        target="blank"
      >
        Retrieve
      </Button>
    </div>
  )
}
