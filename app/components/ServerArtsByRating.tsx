import React from 'react'
import { getArtsByRating } from '../actions/getArtsByRating'
import Reviews from './Reviews';

export default async function ServerArtsByRating() {
    const arts = await getArtsByRating();

  return (
    <div>
      {Array.isArray(arts) &&
        arts.map((art: any) => {
          return <Reviews key={art.id} data={art} />;
        })}
    </div>
  );
}
