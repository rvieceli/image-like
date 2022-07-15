import { useEffect, useMemo, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useMyImagesQuery } from '@image-like/data-access';
import Masonry from 'react-masonry-css';

import { Header } from '../components/header/Header';
import { ImageCard } from '../components/image-card/ImageCard';
import { useAuth } from '../contexts/Auth.context';
import styles from './index.module.css';

const Liked: NextPage = () => {
  const { back } = useRouter();
  const { isAuthenticated } = useAuth();
  const [likedPage, setLikedPage] = useState(1);
  const likedImages = useMyImagesQuery({
    skip: !isAuthenticated,
    fetchPolicy: 'cache-and-network',
  });

  const handleLoadMore = () => {
    likedImages.fetchMore({
      variables: {
        page: likedPage + 1,
      },
    });
    setLikedPage(likedPage + 1);
  };

  const hasMore = useMemo(() => {
    return likedImages.data?.myImages.total_pages > likedPage;
  }, [likedImages.data?.myImages.total_pages, likedPage]);

  return (
    <main className="container">
      <Header
        title={
          <div className={styles.title}>
            <h3>my stuff</h3>
            <button onClick={() => back()}>back</button>
          </div>
        }
      />
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
          {likedImages.data?.myImages.results.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
          {hasMore && (
            <div className={styles.hasMore}>
              <button onClick={handleLoadMore}>load more</button>
            </div>
          )}
        </Masonry>
      </div>
    </main>
  );
};

export default Liked;
