import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/lib/axios/instance';
import { z } from 'zod';
import { UserRegisterSchema, UserType } from '@/shared/models/user.model';
import { SessionKeys } from '@/entities/session/model/keys';

type SchemaServer = z.infer<typeof UserRegisterSchema>;
const useSignUp = () =>
    useMutation<{ id: number }, { message?: string }, SchemaServer>({
        mutationFn: (data) => axiosInstance.post('/signup', data).then((v) => v.data),
    });
const useSignIn = () =>
    useMutation<
        { token: string },
        {
            message?: string;
        },
        Omit<SchemaServer, 'name'>
    >({
        mutationFn: (data) => axiosInstance.post('/signin', data).then((v) => v.data),
    });
export const getCurrentUserQueryOptions = () => ({
    queryFn: () => axiosInstance.get<UserType>('/current').then((v) => v.data),
    queryKey: SessionKeys.getCurrentUser(),
});

export const useCurrentUser = () => {
    return useQuery(getCurrentUserQueryOptions());
};
