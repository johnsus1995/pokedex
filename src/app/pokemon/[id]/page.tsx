import { Metadata } from "next";

import PokemonDetailCard from "@/components/pokemon/pokemon-detail-card";

import { getPokemonById } from "@/services/pokemon";

type Props = {
  params: { id: string };
};

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pokemon = await await getPokemonById(params.id)

  return {
    title: `${pokemon.name}`,
    description: `View details about ${pokemon.name} including stats, abilities, and more.`,
    openGraph: {
      images: [{ url: pokemon?.sprites?.front_default, width: 200, height: 200 }],
    },
  };
}

export default async function PokemonDetail({ params }: Props) {
  const pokemon: Pokemon = await getPokemonById(params.id)

  const formattedPokemon = {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((t) => t.type.name),
    stats: pokemon.stats.map((s) => ({ name: s.stat.name, base: s.base_stat })),
    abilities: pokemon.abilities.map((a) => a.ability.name),
    moves: pokemon.moves.slice(0, 5).map((m) => m.move.name),
  };

  return (
    <div className="mt-4">
      <PokemonDetailCard {...formattedPokemon} />
    </div>
  );
}
