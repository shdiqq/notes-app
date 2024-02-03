import { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { login } from "../../utils/api";
import Context from '../../contexts';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
import Loading from '../../components/Loading';
import { CSSTransition } from 'react-transition-group';

function LoginPage({ loginSuccess }) {
  const { locale, theme } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');

  const successRef = useRef(null);
  const errorRef = useRef(null);

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async(event) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await login({email: email,password: password});
    setIsLoading(false);
    if (!response.error) {
      setData(response.data);
      setIsSuccess(true);
    } else {
      setMessage(response.message);
      setIsError(true);
    }
  };

  const closeModalSuccessHandler = () => {
    setIsSuccess(false)
    loginSuccess(data)
  }

  const closeModalErrorHandler = () => {
    setIsError(false)
  }

  return (
    <>
      <div 
        className='sm:max-w-xl w-11/12 rounded-lg'
        onSubmit={onSubmitHandler}
      >
        <form className='border border-gray-700 rounded-lg flex flex-col gap-4 p-12'>
          <h1 className=' text-2xl font-semibold'>
            {locale === 'id' ? 'Masuk ke akun Anda' : 'Sign in to your account'}
          </h1>
          <Input
            type="email"
            label="Email"
            isRequired={true}
            value={email} 
            onChange={onEmailChangeHandler}
          />
          <Input
            type="password"
            label="Password"
            isRequired={true}
            value={password} 
            onChange={onPasswordChangeHandler}
          />
          <div>
            {locale === 'id' ? 'Belum memiliki akun? ' : 'Don`t have an account yet? '}
            <Link 
              className={(theme === 'light' ? 'text-blue-700': 'text-blue-500' ) + ' cursor-pointer hover:underline'}
              to={'/register'}>
              {locale === 'id' ? 'Mendaftar' : 'Sign up'}
            </Link>
          </div>
          <button className={(theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 focus:ring-slate-400': 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-800' ) + ' w-full focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'}>
            {locale === 'id' ? 'Masuk' : 'Sign in'}
          </button>
        </form>
      </div>
      {
        isLoading ? <Loading/> : ''
      }
      <CSSTransition
        in={isSuccess}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={successRef}
      >
        <Success message={locale === "id" ? 'Masuk Berhasil' : 'Login Successful'} closeModal={closeModalSuccessHandler}/>
      </CSSTransition>
      <CSSTransition
        in={isError}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={errorRef}
      >
        <Error message={message.toUpperCase()} closeModal={closeModalErrorHandler}/>
      </CSSTransition>
    </>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;