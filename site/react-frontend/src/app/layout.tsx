import type { Metadata } from 'next';
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});
const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: 'Max Boksem - Personal Website',
	description: 'Personal website of Max Boksem',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth top-1">
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
