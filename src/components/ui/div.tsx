// 'use client';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { axiosInstance } from '@/shared/lib/axios/instance';
// import { useRef, useState } from 'react';
// import Image from 'next/image';
//
// const toBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = reject;
//     });
// export const Div = () => {
//     const { toast } = useToast();
//     const { mutateAsync } = useMutation({
//         mutationFn: () => axiosInstance.post('/signup', {
//             username: 'влад лох',
//             name: 'dsds',
//             password: 'dsds'
//         }, {}).then(v => v.data)
//     });
//     const inputRef = useRef<HTMLInputElement | null>(null);
//
//     const [image, setImage] = useState<string>('');
//     return (
//         <div>
//             <Button onClick={() => toast({ variant: 'destructive', description: 'Абоба' })}
//                     variant="secondary">клик</Button>
//             <Button onClick={async () => {
//                 const { id } = await mutateAsync().then((data) => toast({
//                     variant: 'destructive',
//                     description: data.id
//                 }));
//
//             }} variant="destructive">в</Button>
//             <svg />
//             <Button variant="default">клик</Button>
//             <Button onClick={async () => {
//                 await fetch('/api', {method:'POST'})
//             }} variant="ghost">клик</Button>
//             <input accept="image/*"
//                    type="file"
//                    onChange={async (e) => {
//                        const file = e?.target?.files?.[0];
//                        if(!file) return;
//                        const base64 = await toBase64(file);
//                        setImage(base64);
//                    }}
//                    multiple={false} ref={inputRef} id='file' style={{display:'none'}}/>
//             <Button
//                 role="button"
//                 aria-label="прикрепить картинку поста"
//                 style={{ borderRadius: '10px', textTransform: 'none' }}
//                 color="textPrimary"
//                 onClick={() => inputRef?.current?.click()}
//             >
//                прикрепить
//             </Button>
//             <Image src={image??''} alt='картинки'/>
//             <Button variant="outline">Файл грузи</Button>
//             <Button variant="link">клик</Button>
//         </div>
//
//     );
// };
