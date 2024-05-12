import type { NextApiRequest, NextApiResponse } from 'next';
import { CookieOptions, CookieService } from '@/shared/lib/cookie/CookieService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method ? req.method.toUpperCase() : null;

    switch (method) {
        case 'POST':
            handlePost(req, res);
            break;
        case 'DELETE':
            handleDelete(req, res);
            break;
        default:
            res.status(405).end();
    }
}

type CookiePostBody = Array<{
    key: string;
    value: string;
    options: Omit<CookieOptions, 'httpOnly' | 'expires'> & {
        expires?: number; // timestamp
    };
}>;

function handlePost(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body || !Array.isArray(req.body)) {
        res.status(400).end();
        return;
    }

    for (let cookie of req.body as CookiePostBody) {
        const { key, value, options } = cookie;

        let optionsResolved = options && options.expires ? { ...options, expires: new Date(options.expires) } : options;

        //@ts-ignore
        CookieService.set(key, value, { req, res, ...optionsResolved });
    }

    res.status(200).end();
}

type CookieDeleteBody = Array<{ key: string }>;

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body || !Array.isArray(req.body)) {
        res.status(400).end();
        return;
    }

    for (let { key } of req.body as CookieDeleteBody) {
        CookieService.delete(key, { req, res });
    }

    res.status(200).end();
}
