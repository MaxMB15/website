'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const [isVisible, setIsVisible] = useState(false);
	const pathname = usePathname();

	const updateVisibility = () => {
		const heroSection = document.getElementById('hero');
		if (heroSection) {
			const heroBottom =
				heroSection.offsetTop + heroSection.offsetHeight;
			setIsVisible(window.scrollY > heroBottom);
		} else {
			setIsVisible(true);
		}
	};

	useEffect(() => {
		updateVisibility();
		const handleScroll = () => updateVisibility();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const id = requestAnimationFrame(() => updateVisibility());
		return () => cancelAnimationFrame(id);
	}, [pathname]);

	return (
		<nav
			aria-label="Main navigation"
			className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
				isVisible ? 'translate-y-0' : '-translate-y-full'
			}`}
		>
			<div className="container mx-auto px-4 py-4 max-w-full">
				<div className="flex items-center min-w-0">
					<div className="w-12 min-w-12 flex-shrink-0">
						<Link
							href="/"
							className="text-gray-800 hover:text-gray-600 block"
							aria-label="Home"
						>
							<Image
								src="/images/logos/MB-Logo.svg"
								width={48}
								height={48}
								className="h-12 w-12 min-h-[48px] min-w-[48px]"
								alt=""
								priority
							/>
						</Link>
					</div>
					<ul className="flex justify-center items-center gap-2 sm:gap-3 md:gap-6 flex-1 min-w-0 flex-wrap" role="list">
						<li>
							<Link
								href="/#about"
								className="text-gray-800 hover:text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/#experience"
								className="text-gray-800 hover:text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
							>
								Experience
							</Link>
						</li>
						<li>
							<Link
								href="/#skills"
								className="text-gray-800 hover:text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
							>
								Skills
							</Link>
						</li>
						<li>
							<Link
								href="/#research"
								className="text-gray-800 hover:text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
							>
								Research
							</Link>
						</li>
						<li>
							<Link
								href="/#projects"
								className="text-gray-800 hover:text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
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
