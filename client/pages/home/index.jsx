import useAuth from '../../hooks/useAuth';
import HomePage from '../../components/home.page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      if (auth.token === '') {
        return router.replace('/');
      }
    };
    checkToken()
  }, [auth.token]);

  if (auth.token === null) return <div>Loader...</div>;
  else if (auth.token) {
    return <HomePage {...auth} />;
  }
  return <div>Redirect to login page</div>;
};

export default Home;
