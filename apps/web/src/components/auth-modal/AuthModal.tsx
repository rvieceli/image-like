import { FormEventHandler, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useAuth } from '../../contexts/Auth.context';
import styles from './AuthModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface FieldValues {
  email: string;
  password: string;
  name?: string;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');

export function AuthModal() {
  const { isAuthModalOpen, signIn, signUp, closeAuthModal } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const { reset, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values, ev) => {
    ev.preventDefault();

    if (isRegister) {
      await signUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      reset();
    }

    await signIn({
      email: values.email,
      password: values.password,
    });
    reset();
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onRequestClose={() => {
        reset();
        closeAuthModal();
      }}
      style={customStyles}
      contentLabel="Auth Modal"
    >
      <section className={styles.container}>
        <div className={styles.header}>
          <div className={styles.links}>
            <a
              onClick={() => setIsRegister(false)}
              className={!isRegister ? styles.selected : undefined}
            >
              login
            </a>
            <a
              onClick={() => setIsRegister(true)}
              className={isRegister ? styles.selected : undefined}
            >
              register
            </a>
          </div>
          <button onClick={closeAuthModal}>close</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <input
              {...register('name', { required: isRegister })}
              type="text"
              placeholder="name"
              required
            />
          )}
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="email"
            required
          />
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="password"
            required
          />

          <div>
            <button>{isRegister ? 'register' : 'login'}</button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
