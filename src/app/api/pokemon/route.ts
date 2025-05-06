import { NextResponse } from 'next/server';

import axiosInstance from '@/lib/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offset = searchParams.get('offset') || '0';

  try {
    const response = await axiosInstance.get(
      `pokemon?limit=10&offset=${offset}`,
    );
    const results = response.data.results;

    const detailedPokemon = await Promise.all(
      results.map(async (pokemon: { url: string }) => {
        const detailRes = await axiosInstance.get(pokemon.url);

        return {
          id: detailRes.data.id,
          name: detailRes.data.name,
          image: detailRes.data.sprites.front_default,
          types: detailRes.data.types.map((t: any) => t.type.name),
          url: pokemon.url,
        };
      }),
    );

    return NextResponse.json(detailedPokemon);
  } catch (error) {
    console.error('Error fetching detailed Pokemon data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon details' },
      { status: 500 },
    );
  }
}
