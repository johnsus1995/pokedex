
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import PokemonCard from '@/components/pokemon/pokemon-card';

export default function PokemonList() {
  const hasFetched = useRef(false);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const search = searchParams.get('search') || '';

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    const res = await fetch(`/api/pokemon?offset=${offset}`);
    const data = await res.json();
    setPokemons(prev => [...prev, ...data]);
    setOffset(prev => prev + 10);
    setLoading(false);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchPokemons();
  }, []);

  const combinedPokemon = pokemons.filter(
    (p) =>
      (type === '' || p.types.includes(type)) &&
      (search === '' || p.name.includes(search))
  );


  return (
    <div className="space-y-4 min-h- max-h-[calc(100vh_-_268px)] overflow-y-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {combinedPokemon.map((p, i) => {
          return (
            <PokemonCard key={p.id} pokemon={p} />
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={fetchPokemons}
          disabled={loading}
          className={cn("bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", {
            'hidden': loading || combinedPokemon.length === 0 || search !== '' || type !== '',
          })}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>

        {loading && (
          <div className="flex justify-center items-center h-16">Fetching Pokemon...</div>)}
      </div>
    </div>
  );
}
