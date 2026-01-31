'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyResume, verifyContact } from '@/lib/api';

declare global {
	interface Window {
		turnstile?: {
			render: (
				container: string | HTMLElement,
				options: {
					sitekey: string;
					callback?: (token: string) => void;
					'error-callback'?: () => void;
					theme?: 'light' | 'dark' | 'auto';
					'expired-callback'?: () => void;
				}
			) => string;
			reset: (widgetId?: string) => void;
		};
	}
}

const RESUME_FILENAME = 'Max_Boksem_Resume.pdf';

type ActiveAction = null | 'resume' | 'email';

export default function FooterActions() {
	const [scriptReady, setScriptReady] = useState(false);
	const [activeAction, setActiveAction] = useState<ActiveAction>(null);
	const [resumeLoading, setResumeLoading] = useState(false);
	const [contactLoading, setContactLoading] = useState(false);
	const [contactEmail, setContactEmail] = useState<string | null>(null);
	const [contactError, setContactError] = useState<string | null>(null);
	const [resumeError, setResumeError] = useState<string | null>(null);
	const resumeWidgetId = useRef<string | null>(null);
	const contactWidgetId = useRef<string | null>(null);

	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

	useEffect(() => {
		if (!scriptReady || !siteKey || !window.turnstile || !activeAction) return;

		if (activeAction === 'resume') {
			resumeWidgetId.current = window.turnstile.render('#turnstile-resume', {
				sitekey: siteKey,
				theme: 'auto',
				callback: async (token: string) => {
					setResumeLoading(true);
					setResumeError(null);
					try {
						const blob = await verifyResume(token);
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = RESUME_FILENAME;
						a.click();
						URL.revokeObjectURL(url);
						if (resumeWidgetId.current != null)
							window.turnstile?.reset(resumeWidgetId.current);
						setActiveAction(null);
					} catch {
						setResumeError('Download failed. Please try again.');
					} finally {
						setResumeLoading(false);
					}
				},
			});
		} else if (activeAction === 'email') {
			setContactError(null);
			setContactEmail(null);
			contactWidgetId.current = window.turnstile.render('#turnstile-contact', {
				sitekey: siteKey,
				theme: 'auto',
				callback: async (token: string) => {
					setContactLoading(true);
					try {
						const data = await verifyContact(token);
						setContactEmail(data.email ?? '');
						if (contactWidgetId.current != null)
							window.turnstile?.reset(contactWidgetId.current);
						// Keep panel open so user sees email and Copy button
					} catch {
						setContactError('Something went wrong. Please try again.');
					} finally {
						setContactLoading(false);
					}
				},
			});
		}
	}, [activeAction, scriptReady, siteKey]);

	const copyContact = useCallback(() => {
		if (!contactEmail) return;
		navigator.clipboard.writeText(contactEmail);
	}, [contactEmail]);

	const linkClass =
		'inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors';
	const buttonClass =
		'inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit text-sm';

	if (!siteKey) {
		return (
			<nav
				className="flex flex-wrap items-center justify-center gap-6 pt-2"
				aria-label="Social and contact links"
			>
				<a
					href="https://www.linkedin.com/in/maxboksem"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<Linkedin size={20} aria-hidden />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://github.com/MaxMB15"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<Github size={20} aria-hidden />
					<span>GitHub</span>
				</a>
				<span className="text-sm text-white/60">
					Configure NEXT_PUBLIC_TURNSTILE_SITE_KEY for Resume and Email.
				</span>
			</nav>
		);
	}

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				strategy="afterInteractive"
				onLoad={() => setScriptReady(true)}
			/>
			<nav
				className="flex flex-wrap items-center justify-center gap-6 pt-2"
				aria-label="Social and contact links"
			>
				<a
					href="https://www.linkedin.com/in/maxboksem"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<Linkedin size={20} aria-hidden />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://github.com/MaxMB15"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<Github size={20} aria-hidden />
					<span>GitHub</span>
				</a>
				<button
					type="button"
					onClick={() => {
						setResumeError(null);
						setActiveAction('resume');
					}}
					className={buttonClass}
					disabled={resumeLoading}
					aria-label="Download resume"
				>
					<Download size={20} aria-hidden />
					<span>Resume</span>
				</button>
				<button
					type="button"
					onClick={() => setActiveAction('email')}
					className={buttonClass}
					disabled={contactLoading}
					aria-label="Get email"
				>
					<Mail size={20} aria-hidden />
					<span>Email</span>
				</button>
			</nav>

			{activeAction === 'resume' && (
				<div className="flex flex-col items-center gap-2 pt-4">
					<div id="turnstile-resume" className="turnstile-container" />
					{resumeLoading && (
						<span className="text-xs text-white/60">Preparing download…</span>
					)}
					{resumeError && (
						<p className="text-xs text-amber-300/90" role="alert">
							{resumeError}
						</p>
					)}
				</div>
			)}
			{activeAction === 'email' && (
				<div className="flex flex-col items-center gap-2 pt-4">
					<div id="turnstile-contact" className="turnstile-container" />
					{contactLoading && (
						<span className="text-xs text-white/60">Verifying…</span>
					)}
					{contactError && (
						<p className="text-xs text-amber-300/90" role="alert">
							{contactError}
						</p>
					)}
					{contactEmail !== null && contactEmail !== '' && (
						<div className="flex flex-wrap items-center justify-center gap-2">
							<code className="rounded bg-white/10 px-2 py-1 text-sm text-white/90">
								{contactEmail}
							</code>
							<Button
								variant="ghost"
								size="sm"
								className="text-white/80 hover:text-white"
								onClick={copyContact}
							>
								Copy
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-white/80 hover:text-white"
								onClick={() => setActiveAction(null)}
							>
								Close
							</Button>
						</div>
					)}
				</div>
			)}
		</>
	);
}
