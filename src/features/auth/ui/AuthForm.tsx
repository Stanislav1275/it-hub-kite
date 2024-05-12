'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserAuthSchema } from '@/shared/models/user.model';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/shared/ui/skeleton';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/lib/axios/instance';
import { Button } from '@/shared/ui/button';
import { useDeferredValue } from 'react';
import axios from 'axios';
import { CookieService } from '@/shared/lib/cookie/CookieService';

type SchemaClient = z.infer<typeof UserAuthSchema>;
type SchemaServer = SchemaClient;
export const AuthForm = () => {
    const methods = useForm<SchemaClient>({
        resolver: zodResolver(UserAuthSchema),
        defaultValues: { username: '', password: '' },
    });
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const { toast } = useToast();
    const { mutateAsync: mutateSignin } = useMutation<
        { token: string },
        {
            message?: string;
        },
        Omit<SchemaServer, 'name'>
    >({
        mutationFn: (data) => axiosInstance.post('/signin', data).then((v) => v.data),
    });
    const onSubmit: SubmitHandler<SchemaClient> = async (data) => {
        try {
            const { token } = await mutateSignin(data);
            CookieService.set('token', token);
            toast({ variant: 'default', description: 'Авторизация прошла успешна' });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast({ variant: 'destructive', description: `Ошибка сервера: ${e?.response?.data?.message || '\n'}` });
            } else {
                throw e;
            }
        }
    };
    const isSubmittingDeffered = useDeferredValue(isSubmitting);
    return (
        <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={control}
                    render={({ field, fieldState, formState }) => (
                        <FormItem>
                            <FormLabel>Логин</FormLabel>
                            <FormControl>
                                <Input autoComplete="on" placeholder="cocktail" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="username"
                />

                <FormField
                    control={control}
                    render={({ field, fieldState, formState }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input autoComplete="on" placeholder="пароль" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="password"
                />
                <Button type="submit" loading={isSubmittingDeffered}>
                    Войти
                </Button>
            </form>
        </Form>
    );
};
export const AuthFormSkeleton = () => (
    <div className="flex flex-col space-y-8">
        <div>
            <Skeleton className="w-[100px] h-4 rounded-full mb-1" />
            <Skeleton className="w-full h-9 rounded-full" />
        </div>
        <div>
            <Skeleton className="w-[100px] h-4 rounded-full mb-1" />
            <Skeleton className="w-full h-9 rounded-full" />
        </div>
        <Skeleton className="w-[177px] self-start h-9 rounded-full" />
    </div>
);
