import { useAuth } from '../../contexts/Auth.context';
import styles from './Header.module.css';

interface HeaderProps {
  doSearch: (searchTerm?: string) => void;
}

export const Header = ({ doSearch }: HeaderProps) => {
  const { isAuthenticated, user, signOut, openAuthModal } = useAuth();

  return (
    <header className={styles.container}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          doSearch(ev.target[0].value);
        }}
      >
        <input id="search" name="search" type="text" placeholder="search" />
        <button type="submit">search</button>
      </form>

      {isAuthenticated ? (
        <div className={styles['logged-in']}>
          <span>Hi, {user.name}</span>
          <button onClick={signOut}>logout</button>
        </div>
      ) : (
        <button onClick={openAuthModal}>Login</button>
      )}
    </header>
  );
};
