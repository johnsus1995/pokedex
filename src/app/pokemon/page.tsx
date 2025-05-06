import * as React from 'react';

import PokemonSearch from '@/components/pokemon/pokemon-search';

export default async function HomePage() {

  const searchComponent = await PokemonSearch();

  return (
    <main>
      {searchComponent}
    </main>
  );
}
