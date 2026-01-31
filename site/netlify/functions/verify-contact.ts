import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function verifyTurnstile(token: string, remoteip?: string): Promise<{ success: boolean }> {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		console.error('TURNSTILE_SECRET_KEY not set');
		return { success: false };
	}
	const formData = new URLSearchParams();
	formData.append('secret', secret);
	formData.append('response', token);
	if (remoteip) formData.append('remoteip', remoteip);

	const res = await fetch(TURNSTILE_VERIFY_URL, {
		method: 'POST',
		body: formData,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});
	const data = (await res.json()) as { success?: boolean };
	return { success: Boolean(data?.success) };
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	let body: { token?: string };
	try {
		body = typeof event.body === 'string' ? JSON.parse(event.body) : {};
	} catch {
		return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
	}

	const token = body?.token;
	if (!token || typeof token !== 'string') {
		return { statusCode: 400, body: JSON.stringify({ error: 'Missing token' }) };
	}

	const remoteip = event.headers['x-forwarded-for']?.split(',')[0]?.trim()
		|| event.headers['client-ip']
		|| undefined;

	const verification = await verifyTurnstile(token, remoteip);
	if (!verification.success) {
		return {
			statusCode: 403,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Verification failed' }),
		};
	}

	const email = process.env.CONTACT_EMAIL || '';
	return {
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	};
};
