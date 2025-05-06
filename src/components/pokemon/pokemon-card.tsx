import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function PokemonCard({ pokemon }: { pokemon: any }) {

  return (
    <Link href={`/pokemon/${pokemon?.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <CardHeader className="p-0 overflow-hidden bg-secondary/50 relative">
          <div className="w-full aspect-square relative bg-white/50 flex items-center justify-center p-4">
            <Image
              src={pokemon?.image}
              alt={pokemon?.name}
              width={150}
              height={150}
              className="object-contain w-32 h-32 group-hover:scale-110 transition-transform duration-300"
              priority={pokemon?.id <= 12}
            />
          </div>

        </CardHeader>
        <CardContent className="pt-4 flex-grow">
          <h3 className="font-semibold text-lg capitalize mb-2">
            {pokemon?.name.replace(/-/g, ' ')}
          </h3>
        </CardContent>
        <CardFooter className="flex gap-2 flex-wrap pt-0 pb-4">
          {pokemon?.types.map((type: any) => (
            <Badge key={type} variant="outline" >
              <span className="capitalize">{type}</span>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}