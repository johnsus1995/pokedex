import { Suspense } from "react";

import PokemonList from "@/components/pokemon/pokemon-list";
import SearchForm from "@/components/pokemon/search-form";

async function getPokemonTypes(): Promise<any> {
  const res = await fetch('http://localhost:3000/api/pokemon-types', {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.log('Failed to fetch Pokemon types');
  }

  return res.json();
}

export default async function PokemonSearch() {
  const types = await getPokemonTypes();
  const mappedTypes = types?.results.map((type: any) => type.name);

  return (
    <div className="md:space-y-8 p-4">
      <SearchForm types={mappedTypes || []} />
      <Suspense fallback={<div>Loading Pokemon...</div>}>
        <PokemonList />
      </Suspense>
    </div>
  );
}