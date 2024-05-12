import { z } from 'zod';
import { TeamPartialAsUser } from '@/shared/models/team.model';

export const UserAuthSchema = z.object({
    username: z.string().min(2, { message: 'Слишком короткий ник' }).max(50, { message: 'Ник должен быть меньше или равен 50 символов' }),
    password: z
        .string()
        .min(5, { message: 'Пароль должен быть более длиннее 4 символов' })
        .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/, { message: 'Пароль должен состоять из латинских букв и иметь хотя бы один спец.символ:@$@%&&*' }),
});
export const UserRegisterSchema = UserAuthSchema.extend({
    name: z.string().min(2, { message: 'Слишком короткое имя' }).max(50, { message: 'Имя должен быть меньше 50 символов' }),
});

export const UserRegisterFormSchema = UserRegisterSchema.extend({
    confirmPassword: z.string().min(5),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

export type UserType = {
    id: number;
    username: string;
    avatar?: string;
    firstname: string;
    lastname: string;
    bio_info?: string;
    email?: string;
    telegram?: string;
    link?: string;
    teams?: TeamPartialAsUser[] | null;
};
