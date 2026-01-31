'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
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
	const open = activeAction !== null;

	useEffect(() => {
		if (!scriptReady || !siteKey || !window.turnstile || !activeAction) return;

		const id = requestAnimationFrame(() => {
			const turnstile = window.turnstile;
			if (!turnstile) return;
			if (activeAction === 'resume') {
				const container = document.getElementById('turnstile-resume');
				if (!container) return;
				resumeWidgetId.current = turnstile.render(container, {
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
						} catch (err) {
							setResumeError(
								err instanceof Error ? err.message : 'Download failed. Please try again.'
							);
						} finally {
							setResumeLoading(false);
						}
					},
				});
			} else if (activeAction === 'email') {
				setContactError(null);
				setContactEmail(null);
				const container = document.getElementById('turnstile-contact');
				if (!container) return;
				contactWidgetId.current = turnstile.render(container, {
					sitekey: siteKey,
					theme: 'auto',
					callback: async (token: string) => {
						setContactLoading(true);
						try {
							const data = await verifyContact(token);
							setContactEmail(data.email ?? '');
							if (contactWidgetId.current != null)
								window.turnstile?.reset(contactWidgetId.current);
						} catch {
							setContactError('Something went wrong. Please try again.');
						} finally {
							setContactLoading(false);
						}
					},
				});
			}
		});
		return () => cancelAnimationFrame(id);
	}, [activeAction, scriptReady, siteKey]);

	const copyContact = useCallback(() => {
		if (!contactEmail) return;
		navigator.clipboard.writeText(contactEmail);
	}, [contactEmail]);

	const handleOpenChange = useCallback((open: boolean) => {
		if (!open) setActiveAction(null);
	}, []);

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

			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>
							{activeAction === 'resume'
								? 'Download resume'
								: activeAction === 'email'
									? 'Get contact info'
									: ''}
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col items-center gap-4 py-2">
						{activeAction === 'resume' && (
							<>
								<div id="turnstile-resume" className="turnstile-container" />
								{resumeLoading && (
									<span className="text-sm text-muted-foreground">
										Preparing download…
									</span>
								)}
								{resumeError && (
									<p className="text-sm text-destructive" role="alert">
										{resumeError}
									</p>
								)}
							</>
						)}
						{activeAction === 'email' && (
							<>
								<div id="turnstile-contact" className="turnstile-container" />
								{contactLoading && (
									<span className="text-sm text-muted-foreground">
										Verifying…
									</span>
								)}
								{contactError && (
									<p className="text-sm text-destructive" role="alert">
										{contactError}
									</p>
								)}
								{contactEmail !== null && contactEmail !== '' && (
									<div className="flex flex-wrap items-center justify-center gap-2 w-full">
										<code className="rounded bg-muted px-2 py-1 text-sm flex-1 min-w-0 truncate">
											{contactEmail}
										</code>
										<Button
											variant="secondary"
											size="sm"
											onClick={copyContact}
										>
											Copy
										</Button>
									</div>
								)}
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
