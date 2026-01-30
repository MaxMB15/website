import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer
			className="text-white py-10 px-4"
			style={{ backgroundColor: 'var(--footer-bg)' }}
			role="contentinfo"
		>
			<div className="container mx-auto max-w-3xl text-center space-y-4">
				<p className="text-sm text-white/90">
					&copy; {year} Max Boksem
				</p>
				<p className="text-sm text-white/80 font-light leading-relaxed">
					Made by Me — no templates, no stock. All photos
					are mine.
				</p>
				<nav
					className="flex items-center justify-center gap-6 pt-2"
					aria-label="Social links"
				>
					<a
						href="https://www.linkedin.com/in/maxboksem"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
					>
						<Linkedin size={20} aria-hidden />
						<span>LinkedIn</span>
					</a>
					<a
						href="https://github.com/MaxMB15"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
					>
						<Github size={20} aria-hidden />
						<span>GitHub</span>
					</a>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
