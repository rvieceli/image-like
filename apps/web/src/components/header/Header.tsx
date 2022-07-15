import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/Auth.context';
import styles from './Header.module.css';

interface HeaderProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  search?: boolean;
}

export const Header = ({ search = false, title, children }: HeaderProps) => {
  const { replace, query } = useRouter();
  const { isAuthenticated, user, signOut, openAuthModal } = useAuth();

  return (
    <header className={styles.container}>
      {title}
      {search && (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            const q = ev.target[0].value;

            if (q) {
              replace({
                query: { q },
              });
            } else {
              replace({
                query: {},
              });
            }
          }}
        >
          <input
            defaultValue={query.q}
            id="search"
            name="search"
            type="text"
            placeholder="search"
          />
          <button type="submit">search</button>
        </form>
      )}

      {isAuthenticated ? (
        <div className={styles['logged-in']}>
          {children ? children : <span>Hi, {user.name}</span>}
          <button onClick={signOut}>logout</button>
        </div>
      ) : (
        <button onClick={openAuthModal}>Login</button>
      )}
    </header>
  );
};
