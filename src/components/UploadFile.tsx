import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadProvider from 'providers/UploadProvider'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FileTable from 'components/FileTable'
import { FileWithPath } from 'types'
import { makeStyles } from '@material-ui/core/styles'
import { IPFS_GATEWAY } from 'config'

const useStyles = makeStyles(() => ({
  fileTable: {
    paddingTop: '10px',
    paddingBottom: '150px',
  },
  actions: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: '0px',
    left: '0px',
    padding: '10px',
    backgroundColor: 'white',
    margin: '0px',
  },
  uploaded: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttons: {
    marginLeft: '5px',
    marginRight: '5px',
  },
}))

export default () => {
  const [hash, setHash] = useState<string | undefined>()
  const [uploading, setUploading] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setHash(undefined)
      setUploading(false)
    },
  })
  const classes = useStyles()

  return (
    <UploadProvider.Consumer>
      {({ actions: { upload } }) => (
        <>
          <div className="upload-file-container">
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getRootProps({ className: 'dropzone mb-4' })}
            >
              <input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getInputProps()}
              />
              <span>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </span>
            </div>
          </div>
          {acceptedFiles.length > 0 && (
            <div className={classes.fileTable}>
              <FileTable acceptedFiles={acceptedFiles as FileWithPath[]} />
            </div>
          )}
          <div className={classes.actions}>
            {!hash && (
              <div>
                {acceptedFiles.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploading}
                    size="large"
                    onClick={async () => {
                      setUploading(true)
                      setHash(await upload(acceptedFiles))
                      setUploading(false)
                    }}
                  >
                    {uploading ? 'Uploading' : 'Upload'}
                  </Button>
                )}
              </div>
            )}
            {hash && (
              <div className={classes.uploaded}>
                <div>
                  Your file was successfully uploaded and is accessible under
                  this hash:
                  <pre>{hash}</pre>
                </div>
                <div>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="secondary"
                    size="large"
                    target="blank"
                    href={`${IPFS_GATEWAY}${hash}`}
                  >
                    View upload
                  </Button>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
                    size="large"
                    target="blank"
                    href={`https://twitter.com/intent/tweet/?status=See my latest article on RIF Storage. ${encodeURIComponent(
                      `${IPFS_GATEWAY}${hash}`,
                    )}&url=${encodeURIComponent(`${hash}`)}`}
                  >
                    Tweet!
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </UploadProvider.Consumer>
  )
}
