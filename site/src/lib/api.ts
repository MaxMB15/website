import axios from 'axios';

const FUNCTIONS_BASE = '/.netlify/functions';

export const api = axios.create({
	baseURL: FUNCTIONS_BASE,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 15_000,
});

export interface VerifyContactResponse {
	email: string;
}

export async function verifyResume(token: string): Promise<Blob> {
	try {
		const { data, status } = await api.post<Blob>('/verify-resume', { token }, {
			responseType: 'blob',
			validateStatus: () => true,
		});
		if (status >= 400) {
			const text = typeof data === 'string' ? data : await (data as Blob).text();
			let message = 'Download failed. Please try again.';
			try {
				const parsed = JSON.parse(text) as { error?: string };
				if (parsed?.error) message = parsed.error;
			} catch {
				// use default message
			}
			throw new Error(message);
		}
		return data as Blob;
	} catch (err) {
		if (err instanceof Error) throw err;
		throw new Error('Download failed. Please try again.');
	}
}

export async function verifyContact(token: string): Promise<VerifyContactResponse> {
	const { data } = await api.post<VerifyContactResponse>('/verify-contact', { token });
	return data;
}
