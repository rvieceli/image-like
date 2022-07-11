import { FormEvent, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import { useGetImagesQuery } from '@image-like/data-access';

import { useAuth, withSSRGuest } from '../contexts/Auth.context';
import { client } from '../services/apollo-client';
import styles from './index.module.css';

const Home: NextPage = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('rafae@email.com');
  const [password, setPassword] = useState('123456');

  const { data } = useGetImagesQuery();

  console.log(data);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await signIn({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Enter</button>
    </form>
  );
};

// export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
//   const { data } = await client.query<GetImagesQuery, QueryGetImagesArgs>({
//     query: GetImagesDocument,
//   });
//   console.log({ data });
//   return {
//     props: {
//       images: data.getImages,
//     },
//   };
// });

export default Home;
