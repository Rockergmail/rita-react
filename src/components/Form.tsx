import { ChangeEvent, FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/*
 * @description:
 * @author: xiangrong.liu
 * @Date: 2024-06-05 21:07:47
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2024-06-05 21:34:54
 */
export const MyForm: FC = () => {
  const [value, setValue] = useState("");
  const changeSth = () => {
    setValue(`new value`);
  };
  // TODO: 其实这些应该很常见，但是肯定不会记住吧？有什么比较方便的方案吗？
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      <input
        type="text"
        name="myinput"
        id="myinput"
        value={value}
        onChange={onChange}
      />
      <div>{value}</div>
      <button type="button" onClick={changeSth}>
        change to `new value`
      </button>
      <br />
    </>
  );
};

export const MyForm2: FC = () => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [checked, setChekced] = useState(false);
  return (
    <>
      <p>
        username:{" "}
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </p>
      <p>
        password:{" "}
        <input
          type="text"
          name="password"
          id="password"
          value={pwd}
          onChange={(event) => {
            setPwd(event.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="checkbox"
          checked={checked}
          name="check"
          id="check"
          value={username}
          onChange={(event) => {
            setChekced(event.target.checked);
          }}
        />
      </p>
      <pre>{JSON.stringify({ username, password: pwd, checked })}</pre>
    </>
  );
};

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const MyForm3: FC = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            console.log("sending vaues", values);
            // const response = await axios.post('https://example.com/api/signup', values);
            // console.log('Server response:', response);
            resetForm();
          } catch (error) {
            console.error("Error submitting form:", error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
