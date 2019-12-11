import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import UploadProvider from "providers/UploadProvider";
import { Formik, Form } from "formik";
import Provider from "components/Provider";

interface FormValues {
  hash: string;
}

interface FormErrors {
  hash?: string;
}

export default () => (
  <>
    <Provider />
    <div className="text-right">
      <UploadProvider.Consumer>
        {({ actions: { download } }) => (
          <Formik
            validate={async ({ hash }: FormValues) => {
              let errors: FormErrors = {};
              if (!hash) errors.hash = "Required";
              return errors;
            }}
            onSubmit={({ hash }: FormValues, actions) => {
              download(hash);
              actions.resetForm();
            }}
            initialValues={{
              hash: ""
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              isValid,
              errors
            }) => (
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3" style={{ marginTop: "1em" }}>
                  <FormControl
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
                </InputGroup>
                <div className="text-left">
                  {errors.hash && (
                    <small style={{ color: "red" }}>{errors.hash}</small>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={!isValid}
                >
                  Retrieve
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </UploadProvider.Consumer>
    </div>
  </>
);
