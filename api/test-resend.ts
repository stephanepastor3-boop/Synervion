import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const key = process.env.RESEND_API_KEY;
        const hasKey = !!key;
        // Show first 3 chars of key if present, else 'none'
        const keyPrefix = key ? key.substring(0, 3) : 'none';

        // Initialize to test import
        const r = new Resend('re_123');

        res.status(200).json({
            status: 'ok',
            message: 'Resend import works',
            env_check: {
                has_key: hasKey,
                key_prefix: keyPrefix,
                node_env: process.env.NODE_ENV
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: String(error) });
    }
}
