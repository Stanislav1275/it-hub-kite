'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserRegisterFormSchema, UserRegisterSchema } from '@/shared/models/user.model';
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

type SchemaClient = z.infer<typeof UserRegisterFormSchema>;
type SchemaServer = z.infer<typeof UserRegisterSchema>;
export const RegisterForm = () => {
    const methods = useForm<SchemaClient>({
        resolver: zodResolver(UserRegisterFormSchema),
        defaultValues: { username: '', name: '', password: '', confirmPassword: '' },
    });
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const { toast } = useToast();
    const { mutateAsync, error } = useMutation<{ id: number }, { message?: string }, SchemaServer>({
        mutationFn: (data) => axiosInstance.post('/signup', data).then((v) => v.data),
    });
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
        const { confirmPassword, ...signUpData } = data;
        try {
            const { id } = await mutateAsync(signUpData);
            const { name, ...signInData } = signUpData;
            const { token } = await mutateSignin(signInData);
            CookieService.set('token', token);
            toast({ variant: 'default', description: 'Регистрация прошла успешна' });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast({ variant: 'destructive', description: `Ошибка сервера: ${e?.response?.data.message}` });
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
                                <Input placeholder="cocktail" type="text" {...field} />
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
                            <FormLabel>ФИО</FormLabel>
                            <FormControl>
                                <Input placeholder="Иосиф" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="name"
                />
                <FormField
                    control={control}
                    render={({ field, fieldState, formState }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="пароль" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="password"
                />
                <FormField
                    control={control}
                    render={({ field, fieldState, formState }) => (
                        <FormItem>
                            <FormLabel>Подвердите пароль пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Пароль ещё раз" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="confirmPassword"
                />

                <Button loading={isSubmittingDeffered}>Зарегистрироваться</Button>
            </form>
        </Form>
    );
};
export const RegisterFormSkeleton = () => (
    <div className="flex flex-col space-y-8">
        <div>
            <Skeleton className="w-[100px] h-4 rounded-full mb-1" />
            <Skeleton className="w-full h-9 rounded-full" />
        </div>
        <div>
            <Skeleton className="w-[100px] h-4 rounded-full mb-1" />
            <Skeleton className="w-full h-9 rounded-full" />
        </div>
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
