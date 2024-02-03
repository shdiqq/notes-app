import { useState, useContext } from 'react';
import Context from '../../contexts';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/api';
import Loading from '../../components/Loading';
import { CSSTransition } from 'react-transition-group';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';

function RegisterPage() {
  const navigate = useNavigate();

  const { locale, theme } = useContext(Context);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onPasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value)
  }

  const onSubmitHandler = async(event) => {
    setIsLoading(true);
    event.preventDefault();
    if (password !== passwordConfirm) {
      setMessage('Konfirmasi password tidak sesuai')
      setIsError(true)
      return
    }

    const response = await register({name: username, email: email,password: password});
    setIsLoading(false);

    if (!response.error) {
      setIsSuccess(true);
    } else {
      setMessage(response.message);
      setIsError(true);
    }
  };

  const closeModalSuccessHandler = () => {
    setIsSuccess(false)
    navigate('/notes-app');
  }

  const closeModalErrorHandler = () => {
    setIsError(false)
  }

  return (
    <>
      <div className='sm:max-w-xl w-11/12 rounded-lg'>
        <form 
          className={(theme === 'light' ? 'border-gray-600' : 'border-gray-400') + ' border rounded-lg flex flex-col gap-4 p-12'}
          onSubmit={onSubmitHandler}
        >
          <h1 className=' text-2xl font-semibold'>
            {locale === 'id' ? 'Daftarkan akun Anda' : 'Register your account'}
          </h1>
          <Input
            type="text"
            label="Username"
            isRequired={true}
            value={username}
            onChange={onUsernameChange}
          />
          <Input
            type="email"
            label="Email"
            isRequired={true}
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type="password"
            label="Password"
            isRequired={true}
            value={password}
            onChange={onPasswordChange}
          />
          <Input
            type="password"
            label={locale === 'id' ? 'Konfirmasi Password' : 'Confirm password'}
            isRequired={true}
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
          />
          <div>
            {locale === 'id' ? 'Sudah memiliki akun? ' : 'Already have an account? '}
            <Link 
              className={(theme === 'light' ? 'text-blue-700': 'text-blue-500' ) + ' cursor-pointer hover:underline'}
              to={'/notes-app/'}>
              {locale === 'id' ? 'Gabung' : 'Log in'}
            </Link>
          </div>
          <button className={(theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 focus:ring-slate-400': 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-800' ) + ' w-full focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'}>
            {locale === 'id' ? 'Daftar' : 'Sign up'}
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
      >
        <Success message={locale === 'id' ? 'Daftar Berhasil' : 'Register Successfully'} closeModal={closeModalSuccessHandler}/>
      </CSSTransition>
      <CSSTransition
        in={isError}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Error message={message.toUpperCase()} closeModal={closeModalErrorHandler}/>
      </CSSTransition>
    </>
  );
}

export default RegisterPage;