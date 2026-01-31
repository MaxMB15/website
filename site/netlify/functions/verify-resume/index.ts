import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import * as fs from 'fs';
import * as path from 'path';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESUME_FILENAME = 'Max_Boksem_Resume.pdf';

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
			headers: { 'Content-Type': 'application/json' } as Record<string, string>,
			body: JSON.stringify({ error: 'Verification failed' }),
		};
	}

	const possiblePaths = [
		path.join(__dirname, 'resume.pdf'),
		path.join(__dirname, '..', 'resume.pdf'),
		path.join(process.cwd(), 'resume.pdf'),
		path.join(process.cwd(), 'verify-resume', 'resume.pdf'),
		path.join(process.cwd(), 'netlify', 'functions', 'verify-resume', 'resume.pdf'),
		path.resolve('netlify/functions/verify-resume/resume.pdf'),
	];
	let resumePath: string | null = null;
	for (const p of possiblePaths) {
		if (fs.existsSync(p)) {
			resumePath = p;
			break;
		}
	}
	if (!resumePath) {
		console.error('resume.pdf not found. Tried:', possiblePaths);
		return { statusCode: 500, body: JSON.stringify({ error: 'Resume unavailable' }) };
	}

	const pdfBuffer = fs.readFileSync(resumePath);
	const encodedFilename = encodeURIComponent(RESUME_FILENAME);
	const pdfHeaders: Record<string, string> = {
		'Content-Type': 'application/pdf',
		'Content-Disposition': `attachment; filename="${RESUME_FILENAME}"; filename*=UTF-8''${encodedFilename}`,
		'Content-Length': String(pdfBuffer.length),
	};

	return {
		statusCode: 200,
		headers: pdfHeaders,
		body: pdfBuffer.toString('base64'),
		isBase64Encoded: true,
	};
};
