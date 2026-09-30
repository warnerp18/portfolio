import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "assets/src";
const OUT_DIR = "assets/img";
const WIDTHS = [800, 1600];
const CROPS = { hero: 1.65 };
const FORMATS = [
  { format: "avif", ext: "avif", quality: 50 },
  { format: "webp", ext: "webp", quality: 75 },
  { format: "jpeg", ext: "jpg", quality: 75 },
];

await mkdir(OUT_DIR, { recursive: true });

const files = await readdir(SRC_DIR);
const images = files.filter((file) =>
  [".png", ".jpg", ".jpeg"].includes(path.extname(file).toLowerCase()),
);
for (const file of images) {
  const input = path.join(SRC_DIR, file);
  const name = path.parse(file).name;
  const { width, height } = await sharp(input).metadata();

  const ratio = CROPS[name];
  const maxWidth = ratio ? Math.min(width, Math.round(height * ratio)) : width;

  const capped = WIDTHS.map((w) => Math.min(w, maxWidth));

  const sizes = [...new Set(capped)];

  for (const size of sizes) {
    const outHeight = ratio ? Math.round(size / ratio) : undefined;

    for (const { format, ext, quality } of FORMATS) {
      const output = path.join(OUT_DIR, `${name}-${size}.${ext}`);
      const info = await sharp(input)
        .resize({
          width: size,
          height: outHeight,
          fit: "cover",
        })
        .toFormat(format, { quality })
        .toFile(output);

      console.log(output, `${Math.round(info.size / 1024)} KB`);
    }
  }
}
