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
	const { data } = await api.post<Blob>('/verify-resume', { token }, {
		responseType: 'blob',
	});
	return data;
}

export async function verifyContact(token: string): Promise<VerifyContactResponse> {
	const { data } = await api.post<VerifyContactResponse>('/verify-contact', { token });
	return data;
}
