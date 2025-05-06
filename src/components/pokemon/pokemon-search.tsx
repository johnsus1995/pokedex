import { Suspense } from "react";

import PokemonList from "@/components/pokemon/pokemon-list";
import SearchForm from "@/components/pokemon/search-form";

import { getPokemonTypes } from "@/services/pokemon";

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