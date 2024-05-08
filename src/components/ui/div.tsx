'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from '@/shared/lib/axios/instance';

export const Div = () => {
    const { toast } = useToast();
    // const { mutate, data } = useMutation({
    //     mutationFn: () => axiosInstance.post('auth/signup', { username: 'dsds', name: 'dsds', password: 'dsds' }, {
    //     }).then(v => v.data)
    // });
    // console.log(data);
    return (
        <div>
            <Button onClick={() => toast({ variant: 'destructive', description: 'Абоба' })}
                    variant="secondary">клик</Button>
            <Button onClick={() => {
                // mutate();
            }} variant="destructive">в</Button>
            <Button variant="default">клик</Button>
            <Button variant="ghost">клик</Button>
            <Button variant="outline">клик</Button>
            <Button variant="link">клик</Button>
        </div>

    );
};
