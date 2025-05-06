import axiosInstance from '@/lib/api';

export const getPokemonById = async (id: string) => {
  const res = await axiosInstance.get(`/pokemon/${id}`, {});

  return res?.data;
};

export const getAllPokemon = async ({ offset = 0 }: { offset: number }) => {
  const res = await axiosInstance.get(`/pokemon`, {
    params: {
      limit: 10,
      offset,
    },
  });

  return res?.data;
};

export const getPokemonTypes = async () => {
  const res = await axiosInstance.get(`/type`, {});

  return res?.data;
};
