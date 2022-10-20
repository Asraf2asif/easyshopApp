import React from 'react';
import Input from '../../../../util/Input';
import Loader from '../../../_partial/Loader';
import Message from '../../../_partial/Message';

export const Frm = ({
  submitHandler,
  isRegister,
  error,
  massage,
  loading,
  inputVal,
  inputSet,
}) => {
  const { name, email, showPassword, password, confirmPassword } = inputVal;

  const {
    setName,
    setEmail,
    setShowPassword,
    setPassword,
    setConfirmPassword,
  } = inputSet;

  return (
    <form onSubmit={submitHandler} className='bg-black-i'>
      <h2>{isRegister ? 'Register' : 'Sign In'}</h2>

      {error && <Message variant='danger'>{error}</Message>}
      {massage && <Message variant='danger'>{massage}</Message>}
      {loading && <Loader />}

      {isRegister && (
        <Input
          name='name'
          className='shadow-small'
          faProps={{ className: 'fa fa-user fa-fw' }}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      )}

      <Input
        lbText='Email Address'
        className='shadow-small'
        faProps={{ className: 'fa fa-envelope fa-fw' }}
        type='email'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <Input
        faProps={{ className: 'fa fa-key fa-fw' }}
        className='shadow-small'
        type={showPassword === true ? 'text' : 'password'}
        showPassProps={{
          editPassword: true,
          onClick: () => {
            setShowPassword((prevState) => {
              return !prevState;
            });
          },
        }}
        name='password'
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      {isRegister && (
        <Input
          faProps={{ className: 'fa fa-key fa-fw' }}
          className='shadow-small'
          name='confirmPassword'
          type={showPassword === true ? 'text' : 'password'}
          showPassProps={{
            editPassword: true,
            onClick: () => {
              setShowPassword((prevState) => {
                return !prevState;
              });
            },
          }}
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
      )}

      <div className='text-center'>
        {!isRegister && (
          <a href='/login' className='link'>
            Forgot your password?
          </a>
        )}

        <button type='submit' className='button-6 rounded-pill d-block mx-auto'>
          {isRegister ? 'Register' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};
