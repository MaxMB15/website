'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const heroSection = document.getElementById('hero');
			if (heroSection) {
				const heroBottom =
					heroSection.offsetTop + heroSection.offsetHeight;
				setIsVisible(window.scrollY > heroBottom);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
				isVisible ? 'translate-y-0' : '-translate-y-full'
			}`}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center">
					<div className="w-16">
                    <Link
								href="/"
								className="text-gray-800 hover:text-gray-600"
						>
						<Image
							src="/images/logos/MB-Logo.svg"
							width={48}
							height={48}
							className="h-12 w-12"
							alt="Logo"
							priority
						/>
                        </Link>
					</div>
					<ul className="flex justify-center space-x-6 flex-1">
						<li>
							<Link
								href="/#about"
								className="text-gray-800 hover:text-gray-600"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/#experience"
								className="text-gray-800 hover:text-gray-600"
							>
								Experience
							</Link>
						</li>
						<li>
							<Link
								href="/#research"
								className="text-gray-800 hover:text-gray-600"
							>
								Research
							</Link>
						</li>
						<li>
							<Link
								href="/#projects"
								className="text-gray-800 hover:text-gray-600"
							>
								Projects
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
