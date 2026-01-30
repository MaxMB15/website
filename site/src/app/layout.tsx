import type { Metadata, Viewport } from 'next';
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { getPersonStructuredData } from '@/lib/structured-data';

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});
const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxboksem.com';
const defaultTitle = 'Max Boksem - Software Engineer & Researcher';
const defaultDescription =
	'Personal website of Max Boksem. Software Engineer, Developer, and Researcher.';

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: defaultTitle,
		template: '%s | Max Boksem',
	},
	description: defaultDescription,
	keywords: [
		'Max Boksem',
		'Software Engineer',
		'Developer',
		'Researcher',
		'Full-stack',
		'Web Developer',
	],
	authors: [{ name: 'Max Boksem', url: baseUrl }],
	creator: 'Max Boksem',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: baseUrl,
		siteName: 'Max Boksem',
		title: defaultTitle,
		description: defaultDescription,
	},
	twitter: {
		card: 'summary_large_image',
		title: defaultTitle,
		description: defaultDescription,
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: baseUrl,
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#1f2937' },
	],
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const structuredData = getPersonStructuredData();
	return (
		<html lang="en" className="scroll-smooth top-1">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
			>
				<a href="#main-content" className="skip-link">
					Skip to content
				</a>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
