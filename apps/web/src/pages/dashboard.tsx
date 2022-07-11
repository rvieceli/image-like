import type { GetServerSideProps, NextPage } from 'next';

import { useAuth, withSSRAuth } from '../contexts/Auth.context';

const Dashboard: NextPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Hi, user</h1>

      <button onClick={signOut}>Leave</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default Dashboard;
