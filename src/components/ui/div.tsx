'use client';
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
export const Div = () => {
    const {toast} = useToast()
    return (
        <div>
            <Button onClick={() => toast({variant: 'destructive', description:'Абоба'})} variant='secondary'>клик</Button>
            <Button variant='destructive'>клик</Button>
            <Button variant='default'>клик</Button>
            <Button variant='ghost'>клик</Button>
            <Button variant='outline'>клик</Button>
            <Button variant='link'>клик</Button>
        </div>

    )
}
