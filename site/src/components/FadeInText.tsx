'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInTextProps {
	text: string;
	className?: string;
}

const FadeInText: React.FC<FadeInTextProps> = ({ text, className }) => {
	const words = text.split(' ');

	return (
		<div className={className}>
			{words.map((word, wordIndex) => (
				<React.Fragment key={wordIndex}>
					{word.split('').map((char, charIndex) => (
						<motion.span
							key={`${wordIndex}-${charIndex}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.5,
								delay:
									charIndex === 0
										? 0
										: 0.7 + Math.random() * 0.6,
							}}
							className="inline-block"
						>
							{char}
						</motion.span>
					))}
					{wordIndex < words.length - 1 && (
						<span className="inline-block w-[0.3em]">&nbsp;</span>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default FadeInText;
