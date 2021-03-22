import { useRouter } from 'next/router';
import Head from 'next/head';
import useAuth from 'hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from 'classnames';
import Home from 'pages/home/index';

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password is too short - should be 4 chars min'),
});

export default function Main() {
  const { login, token } = useAuth();

  const router = useRouter();

  const redirectToRegister = () => {
    router.push('/register');
  };

  const handleSubmit = async (values) => {
    try {
      await login(values);
      router.push('/home');
    } catch (e) {
      console.log(e);
    }
  };
  if (token === null) {
    return <div>Loader ... </div>;
  } else if (token) {
    return <Home />;
  }
  return (
    <div>
      <Head>
        <title>Chat App</title>
      </Head>
      <div className="container">
        <h1 className="text-4xl text-center text-red-600 bg-re mt-20 uppercase font-medium">
          Login
        </h1>
        <div className="container-sm ">
          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Form className="row g-3">
                  <label className="block">
                    <span className="text-gray-700">Email address</span>
                    <Field
                      type="email"
                      className={s('form-control', {
                        'input-error': errors.email && touched.email,
                      })}
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error text-red-600"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Password</span>
                    <Field
                      type="password"
                      className={s('form-control', {
                        'input-error': errors.password && touched.password,
                      })}
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error text-red-600"
                    />
                  </label>
                  <button className="btn btn-primary" type={'submit'}>
                    Login
                  </button>
                  <label className="text-center">or</label>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={redirectToRegister}
                  >
                    Registration
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
