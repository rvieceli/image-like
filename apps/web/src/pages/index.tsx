import { useState } from 'react';

import type { NextPage } from 'next';

import { useGetImagesQuery, useSearchQuery } from '@image-like/data-access';
import Masonry from 'react-masonry-css';

import { Header } from '../components/header/Header';
import { ImageCard } from '../components/image-card/ImageCard';

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const search = useSearchQuery({
    variables: {
      query: searchQuery,
    },
    skip: !searchQuery,
  });
  const { data: likedImages } = useGetImagesQuery();

  const renderImages = () => {
    if (searchQuery) {
      return search.data?.search?.results.map((image) => (
        <ImageCard key={image.id} image={image} />
      ));
    }

    return likedImages?.getImages.results.map((image) => (
      <ImageCard key={image.id} image={image} />
    ));
  };

  return (
    <main className="container">
      <Header doSearch={setSearchQuery} />

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
        </Masonry>
      </div>
    </main>
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
