import { isFile } from '@rsksmart/rif-storage'
import { saveAs } from 'file-saver'
import { Form, Formik } from 'formik'
import UploadProvider from 'providers/UploadProvider'
import React from 'react'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TextField from '@material-ui/core/TextField'

interface FormValues {
  hash: string
}

interface FormErrors {
  hash?: string
}

export default () => (
  <div className="text-right">
    <UploadProvider.Consumer>
      {({ actions: { download } }) => (
        <Formik
          validate={({ hash }: FormValues) => {
            const errors: FormErrors = {}

            if (!hash) errors.hash = 'Required'
            return errors
          }}
          onSubmit={async ({ hash }: FormValues, actions) => {
            const result = await download(hash)

            if (isFile(result)) {
              saveAs(new Blob([result as Buffer]))
            } else if (Object.keys(result).length === 1) {
              const filename = Object.keys(result)[0]
              saveAs(new Blob([result[filename].data]), filename)
            } else {
              // TODO: Offer download of the files
            }
            actions.resetForm()
          }}
          initialValues={{
            hash: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            isValid,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                aria-label="Hash"
                aria-describedby="basic-addon2"
                name="hash"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.hash}
                autoComplete="off"
                autoFocus
                required
              />
              <div className="text-left">
                {errors.hash && (
                  <small style={{ color: 'red' }}>{errors.hash}</small>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                startIcon={<CloudDownloadIcon />}
              >
                Retrieve
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </UploadProvider.Consumer>
  </div>
)
