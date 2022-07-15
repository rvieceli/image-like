import { useMemo, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetImagesQuery } from '@image-like/data-access';
import Masonry from 'react-masonry-css';

import { Header } from '../components/header/Header';
import { ImageCard } from '../components/image-card/ImageCard';
import styles from './index.module.css';

const Home: NextPage = () => {
  const { query } = useRouter();
  const { data, fetchMore } = useGetImagesQuery({
    variables: {
      q: query.q as string | undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  const renderImages = () => {
    return data?.getImages.results.map((image) => (
      <ImageCard key={image.id} image={image} />
    ));
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        page: data?.getImages.page + 1,
      },
    });
  };

  return (
    <main className="container">
      <Header search>
        <Link href="/liked">
          <a>my stuff</a>
        </Link>
      </Header>

      <div>
        <Masonry
          breakpointCols={{
            default: 4,
            1200: 3,
            800: 2,
            500: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderImages()}
          {data?.getImages.hasMore && (
            <div className={styles.hasMore}>
              <button onClick={handleLoadMore}>load more</button>
            </div>
          )}
        </Masonry>
      </div>
    </main>
  );
};

export default Home;
