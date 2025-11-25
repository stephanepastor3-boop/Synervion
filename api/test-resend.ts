import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const r = new Resend('re_123');
        res.status(200).json({ status: 'ok', message: 'Resend import and init works' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: String(error) });
    }
}
