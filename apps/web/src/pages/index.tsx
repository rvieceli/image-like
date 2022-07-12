import { useMemo, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import { useGetImagesQuery, useSearchQuery } from '@image-like/data-access';
import Masonry from 'react-masonry-css';

import { Header } from '../components/header/Header';
import { ImageCard } from '../components/image-card/ImageCard';
import styles from './index.module.css';

const Home: NextPage = () => {
  const [searchPage, setSearchPage] = useState(1);
  const [likedPage, setLikedPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const search = useSearchQuery({
    variables: {
      query: searchQuery,
    },
    skip: !searchQuery,
    fetchPolicy: 'cache-and-network',
  });
  const likedImages = useGetImagesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const renderImages = () => {
    if (searchQuery) {
      return search.data?.search?.results.map((image) => (
        <ImageCard key={image.id} image={image} />
      ));
    }

    return likedImages.data?.getImages.results.map((image) => (
      <ImageCard key={image.id} image={image} />
    ));
  };

  const handleLoadMore = () => {
    if (searchQuery) {
      search.fetchMore({
        variables: {
          page: searchPage + 1,
        },
      });
      setSearchPage(searchPage + 1);
    }
    likedImages.fetchMore({
      variables: {
        page: likedPage + 1,
      },
    });
    setLikedPage(likedPage + 1);
  };

  const hasMore = useMemo(() => {
    if (searchQuery) {
      return search.data?.search.total_pages > searchPage;
    }
    return likedImages.data?.getImages.total_pages > likedPage;
  }, [
    likedImages.data?.getImages.total_pages,
    likedPage,
    search.data?.search.total_pages,
    searchPage,
    searchQuery,
  ]);

  return (
    <main className="container">
      <Header doSearch={setSearchQuery}>
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

export default Home;
