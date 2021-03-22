import Head from "next/head";
import {useRouter} from "next/router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import s from "classnames";

const initialValues = {
  email: "",
  password: "",
  name: ""
};

const signUpSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required!'),
  password: Yup.string().required('Password is required').min(4, 'Password is too short - should be 4 chars min'),
  name: Yup.string().required('Name is required').min(3).max(256)
})


export default function Register() {
  const router = useRouter();
  const {register} = useAuth();
  
  const redirectToLogin = async () => {
    await router.push("/");
  };
  
  const handleSubmit = async (values) => {
    await register(values)
    await router.push('/')
  }
  
  return (
      <div>
        <Head>
          <title>Register Page</title>
        </Head>
        <div className="container">
          <h1
              className={
                "text-4xl text-center text-red-600 bg-re mt-20 uppercase font-medium"
              }
          >
            Register
          </h1>
          <div className="container-sm ">
            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={handleSubmit}
            >
              {(formik) => {
                const {errors, touched, isValid, dirty} = formik;
                return (
                    <Form className="row g-3">
                      <label className="block">
                        <span className="text-gray-700">User Name</span>
                        <Field
                            type="text"
                            className={s('form-control', {'input-error': errors.name && touched.name})}
                            name='name'
                        />
                        <ErrorMessage name="email" component="span" className="error text-red-600"/>
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Email address</span>
                        <Field
                            type="email"
                            className={s('form-control', {'input-error': errors.email && touched.email})}
                            name='email'
                        />
                        <ErrorMessage name="email" component="span" className="error text-red-600"/>
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Password</span>
                        <Field
                            type="password"
                            className={s('form-control', {'input-error': errors.password && touched.password})}
                            name='password'
                        />
                        <ErrorMessage name="password" component="span" className="error text-red-600"/>
                      </label>
                      <button className="btn btn-primary" type={'submit'}>Register</button>
                      <label className="text-center">or</label>
                      <button className="btn btn-primary" type='button' onClick={redirectToLogin}>
                        Login
                      </button>
                    </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
  );
}
