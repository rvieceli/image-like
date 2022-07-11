import { useMemo } from 'react';

import {
  Image,
  useLikeMutation,
  useUnlikeMutation,
} from '@image-like/data-access';

import { useAuth } from '../../contexts/Auth.context';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();
  const { user: loggedUser, isAuthenticated, openAuthModal } = useAuth();

  const iLike = useMemo(
    () => image.likedBy.some((user) => user.id === loggedUser?.id),
    [image.likedBy, loggedUser?.id]
  );

  const handleLike = () => {
    if (!isAuthenticated) {
      return openAuthModal();
    }

    if (iLike) {
      return unlike({
        variables: {
          imageId: image.id,
        },
      });
    }
    like({
      variables: {
        imageId: image.id,
      },
    });
  };

  return (
    <div key={image.id} className={styles.container}>
      <img src={image.url} style={{ width: '100%' }} />
      <footer className={styles.footer}>
        <a href={image.link} target="_blank" rel="noopener noreferrer">
          unsplash 🔗
        </a>

        <button onClick={handleLike}>
          <span>{image.likesCount}</span> {iLike ? 'Unlike' : 'Like'}
        </button>
      </footer>
    </div>
  );
};
