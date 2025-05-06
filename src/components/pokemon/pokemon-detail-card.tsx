'use client';

import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

type PokemonDetailProps = {
  name: string;
  image: string;
  types: string[];
  stats: { name: string; base: number }[];
  abilities: string[];
  moves: string[];
};

export default function PokemonDetailCard({
  name,
  image,
  types,
  stats,
  abilities,
  moves,
}: PokemonDetailProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold capitalize">{name}</h1>
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>

      <div>
        <h2 className="font-semibold my-1 underline">Type</h2>
        <div className="flex gap-2">
          {types.map((type) => (
            <Badge
              key={type}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold underline">Stats</h2>
        <ul className="space-y-1">
          {stats.map((stat) => (
            <li key={stat.name} className="flex justify-between">
              <span className="capitalize">{stat.name}</span>
              <span className='font-bold'>{stat.base}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold underline">Abilities</h2>
        <ul className="list-disc list-inside">
          {abilities.map((ability) => (
            <li key={ability} className="capitalize">{ability}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold underline mb-1">Moves</h2>
        <ul className="flex flex-wrap gap-2">
          {moves.map((move) => (
            <span
              key={move}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm capitalize"
            >
              {move}
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}
