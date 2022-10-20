import React from 'react';
import Input from '../../../../util/Input';
import RowCol from '../../../../util/RowCol';
import Loader from '../../../_partial/Loader';
import Message from '../../../_partial/Message';

export const Frm = ({
  submitHandler,
  massage,
  success,
  profileUpdateErr,
  loading,
  user,
  inpt,
  inptEdit,
  resetState,
}) => {
  const { name, email, showPassword, password, confirmPassword } = inpt.val;

  const {
    setName,
    setEmail,
    setShowPassword,
    setPassword,
    setConfirmPassword,
    setEditable,
  } = inpt.set;

  const { editName, editEmail, editPassword } = inptEdit.state;
  const editing = editName || editEmail || editPassword;

  const { setEditName, setEditEmail, setEditPassword } = inptEdit.set;

  const { userLoginGetting, profileUpdating, userDetailsGetting } = loading;

  return (
    <form onSubmit={submitHandler} className='bg-black-i'>
      <h2>{(editName || editEmail || editPassword) && 'Edit'} User Info</h2>
      {profileUpdateErr && (
        <Message variant='danger'>{profileUpdateErr}</Message>
      )}
      {success && <Message variant='success'>Profile Updated</Message>}
      {massage && <Message variant='danger'>{massage}</Message>}

      {(userLoginGetting || profileUpdating || userDetailsGetting) && (
        <Loader />
      )}
      <div className='container'>
        <div className='outer'>
          <img src='/assets/images/img_avatar.png' alt='Avatar' />
          <div
            className='inner'
            onClick={() => {
              console.log('x');
            }}
          >
            <input
              className='inputfile'
              type='file'
              name='profilePic'
              accept='image/*'
            />
            <label htmlFor='profilePic'>
              <i className='fa-solid fa-arrow-up-from-bracket'></i>
            </label>
          </div>
        </div>
      </div>

      <Input
        className='shadow-small'
        info={
          !editName && {
            name: user ? user.name : 'Username',
            onClick: () => {
              setEditName(true);
            },
          }
        }
        autoFocus={editName}
        withInfo={true}
        faProps={{
          className: 'fa fa-user fa-fw',
          onClick: () => {
            setEditName(false);
            resetState();
          },
        }}
        name='name'
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <Input
        className='shadow-small'
        info={
          !editEmail && {
            email: user ? user.email : 'Email',
            onClick: () => {
              setEditEmail(true);
            },
          }
        }
        autoFocus={editEmail && (!editName || !editPassword)}
        withInfo={true}
        lbText='Email Address'
        faProps={{
          className: 'fa fa-envelope fa-fw',
          onClick: () => {
            setEditEmail(false);
            resetState();
          },
        }}
        type='email'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <Input
        className='shadow-small'
        info={
          !editPassword && {
            password: 'password',
            onClick: () => {
              setEditPassword(true);
            },
          }
        }
        autoFocus={editPassword && (!editName || !editEmail)}
        withInfo={true}
        faProps={{
          className: 'fa fa-key fa-fw',
          onClick: () => {
            setEditPassword(false);
          },
        }}
        name='password'
        type={showPassword === true ? 'text' : 'password'}
        showPassProps={{
          editPassword: editPassword,
          onClick: () => {
            setShowPassword((prevState) => {
              return !prevState;
            });
          },
        }}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      {editPassword && (
        <Input
          className='shadow-small'
          lbText='Confirm Password'
          withInfo={true}
          faProps={{
            className: 'fa fa-key fa-fw',
            onClick: () => {
              setEditPassword(false);
            },
          }}
          name='confirmPassword'
          type={showPassword === true ? 'text' : 'password'}
          showPassProps={{
            editPassword: editPassword,
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
          placeholder='Enter Password Again'
        />
      )}

      {editing ? (
        <RowCol>
          <button type='submit' className='button-6 rounded-pill'>
            Update
          </button>
          <button
            type='button'
            className='secondary button-6 rounded-pill'
            onClick={function (e) {
              e.preventDefault();
              setEditable(false);
            }}
          >
            Cancel
          </button>
        </RowCol>
      ) : (
        <div className='text-center'>
          <button
            type='button'
            className='button-6 rounded-pill'
            onClick={function (e) {
              e.preventDefault();
              setEditable(true);
            }}
          >
            <i className='fa-solid fa-user-pen'></i>
            {'  '}Edit User Info
          </button>
        </div>
      )}
    </form>
  );
};
