'use client';
import { useQuery } from '@tanstack/react-query';
import { getQueryClient } from './queryClient';

interface UseRQValue<T> {
    key: string;
    defaultValue: T;
}

export const useRQValue = <T>({ key, defaultValue }: UseRQValue<T>) => {
    const client = getQueryClient();
    const value = useQuery({
        queryKey: [key],
        queryFn: () => defaultValue,
        refetchOnMount: false,
        staleTime: Infinity,
    }).data! as T;

    const setValue = (newValue: T | ((prev: T) => T)) => {
        client.setQueryData([key], newValue);
    };

    return [value, setValue] as const;
};
