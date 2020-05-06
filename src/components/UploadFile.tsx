import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadProvider from 'providers/UploadProvider'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FileTable from 'components/FileTable'
import { FileWithPath } from 'types'

export default () => {
  const [hash, setHash] = useState<string | undefined>()
  const [uploading, setUploading] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setHash(undefined)
      setUploading(false)
    },
  })

  return (
    <UploadProvider.Consumer>
      {({ actions: { upload } }) => (
        <>
          {/* <Provider /> */}
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
                Drag &apos;n&apos; drop some files here, or click to select files
              </span>
            </div>
          </div>
          {acceptedFiles.length > 0 && (
            <div>
              <FileTable acceptedFiles={acceptedFiles as FileWithPath[]} />
              {!hash && (
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
            <>
              Your file was successfully uploaded and is accessible under this
              hash:
              <br />
              <pre>{hash}</pre>
              <Button
                variant="contained"
                color="secondary"
                target="blank"
                href={`https://ipfs.io/ipfs/${hash}`}
                size="large"
              >
                View upload
              </Button>
              <Button
                variant="contained"
                color="primary"
                target="blank"
                href={`https://twitter.com/intent/tweet/?status=See my latest article on RIF Storage. ${encodeURIComponent(
                  `https://ipfs.io/ipfs//${hash}`,
                )}&url=${encodeURIComponent(`https://ipfs.io/ipfs//${hash}`)}`}
              >
                Tweet!
              </Button>
            </>
          )}
        </>
      )}
    </UploadProvider.Consumer>
  )
}
