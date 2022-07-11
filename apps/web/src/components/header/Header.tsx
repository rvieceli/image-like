import { useAuth } from '../../contexts/Auth.context';
import styles from './Header.module.css';

interface HeaderProps {
  doSearch: (searchTerm?: string) => void;
}

export const Header = ({ doSearch }: HeaderProps) => {
  const { isAuthenticated, signOut } = useAuth();

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
        <button onClick={signOut}>logout</button>
      ) : (
        <button>Login</button>
      )}
    </header>
  );
};
