import axiosInstance from '@/lib/api';

export const getPokemon = async (id: string) => {
  const res = await axiosInstance.get(`/pokemon/${id}`, {});

  return res?.data;
};
