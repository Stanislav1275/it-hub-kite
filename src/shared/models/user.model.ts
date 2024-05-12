import { z } from 'zod';

export const UserRegisterSchema = z.object({
    name: z.string().min(2, { message: 'Слишком короткое имя' }).max(50, { message: 'Имя должен быть меньше 50 символов' }),
    username: z.string().min(2, { message: 'Слишком короткий ник' }).max(20, { message: 'Ник должен быть меньше 20 символов' }),
    password: z
        .string()
        .min(5, { message: 'Пароль должен быть более длиннее 4 символов' })
        .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/, { message: 'Пароль должен состоять из латинских букв и иметь хотя бы один спец.символ:@$@%&&*' }),
});

export const UserRegisterFormSchema = UserRegisterSchema.extend({
    confirmPassword: z.string().min(5),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});
export type UserType = {
    name: string;
    username: string;
};
