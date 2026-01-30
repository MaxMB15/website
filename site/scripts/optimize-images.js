/**
 * Optimizes JPG/JPEG images: resize to max display size and save as WebP.
 * Run from site/: node scripts/optimize-images.js
 * - frontpage/*: max width 1920, quality 82 (hero fullscreen)
 * - me/, portrait/, landscape/*: max width 1200, quality 85 (content images)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const PUBLIC_IMAGES = path.join(__dirname, '..', 'public', 'images');

const CONFIG = {
	frontpage: { maxWidth: 1920, quality: 82 },
	me: { maxWidth: 1200, quality: 85 },
	projects: { maxWidth: 1200, quality: 85 },
};

const JPG_EXT = /\.(jpg|jpeg|JPG|JPEG)$/;

async function optimizeDir(dirName, options) {
	const dir = path.join(PUBLIC_IMAGES, dirName);
	if (!fs.existsSync(dir)) return;
	const files = fs.readdirSync(dir);
	for (const file of files) {
		if (!JPG_EXT.test(file)) continue;
		const inputPath = path.join(dir, file);
		const base = path.basename(file, path.extname(file));
		const outputPath = path.join(dir, `${base}.webp`);
		try {
			await sharp(inputPath)
				.resize(options.maxWidth, null, { withoutEnlargement: true })
				.webp({ quality: options.quality })
				.toFile(outputPath);
			console.log(`  ${dirName}/${file} -> ${base}.webp`);
		} catch (err) {
			console.error(`  ${dirName}/${file}: ${err.message}`);
		}
	}
}

async function main() {
	console.log('Optimizing images to WebP...\n');
	for (const [dirName, options] of Object.entries(CONFIG)) {
		await optimizeDir(dirName, options);
	}
	console.log('\nDone.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
