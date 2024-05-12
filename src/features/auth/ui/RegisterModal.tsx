'use client';
import { useAuthModal } from '@/entities/session/model/states';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { ReactNode } from 'react';
import { Lead } from '@/shared/ui/typography';
import dynamic from 'next/dynamic';
import { RegisterFormSkeleton } from '@/features/auth/ui/RegisterForm';

const RegisterForm = dynamic(() => import(/*RegisterFOrm*/ './RegisterForm').then(({ RegisterForm }) => ({ default: RegisterForm })), {
    loading: () => <RegisterFormSkeleton />,
});
export const RegisterModal = ({ trigger }: { trigger?: ReactNode }) => {
    const [open, setOpen] = useAuthModal();
    if (!open) return null;
    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle>
                    <Lead>Регистрация</Lead>
                </DialogTitle>
                <div>
                    <RegisterForm />
                </div>
            </DialogContent>
        </Dialog>
    );
};
