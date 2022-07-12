import { useAuth } from '../../contexts/Auth.context';
import styles from './Header.module.css';

interface HeaderProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  doSearch?: (searchTerm?: string) => void;
}

export const Header = ({ doSearch, title, children }: HeaderProps) => {
  const { isAuthenticated, user, signOut, openAuthModal } = useAuth();

  return (
    <header className={styles.container}>
      {title}
      {doSearch && (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            doSearch(ev.target[0].value);
          }}
        >
          <input id="search" name="search" type="text" placeholder="search" />
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
