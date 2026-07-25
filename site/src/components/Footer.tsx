import FooterActions from './FooterActions';

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
				<FooterActions />
			</div>
		</footer>
	);
};

export default Footer;
