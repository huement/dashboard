import { defineConfig, Plugin } from 'vite';
import { parse } from 'node-html-parser';
import { readFile } from 'fs/promises';
import path from 'path';
import { PreRenderedAsset } from 'rollup';

// Vite plugin to dynamically parse HTML and extract entry points
const dynamicInputsPlugin = (): Plugin => {
  let inputs: Record<string, string> = {};

  return {
    name: 'dynamic-inputs',
    async config() {
      // Read and parse index.html
      const index = await readFile('./index.html', 'utf8');
      const root = parse(index);

      // Get all link (stylesheets) and script (module) tags
      const assetTags = root.querySelectorAll(
        'link[rel="stylesheet"], script[type="module"]'
      );

      // Create input map
      inputs = Object.fromEntries(
        assetTags
          .map((tag) => {
            const src = tag.getAttribute('href') || tag.getAttribute('src');
            if (!src) {
              console.warn(`No src or href found on tag: ${tag}`);
              return null;
            }
            const fileExtension = path.extname(src);
            const fileName = path.basename(src, fileExtension);
            return [fileName, src];
          })
          .filter((entry): entry is [string, string] => entry !== null)
      );

      return {
        build: {
          rollupOptions: {
            input: inputs,
          },
        },
      };
    },
  };
};

// Function to determine output directory for assets
function getDirFromAsset(assetInfo: PreRenderedAsset): string {
  if (!assetInfo.name) {
    return 'assets';
  }
  if (assetInfo.name.endsWith('.css')) {
    return 'css';
  }
  if (assetInfo.name.endsWith('.js')) {
    return 'js';
  }
  return 'assets';
}

export default defineConfig({
  plugins: [dynamicInputsPlugin()],
  css: {
  },
  build: {
    manifest: true,
    rollupOptions: {
      // Input is handled by the plugin, but you can add manual entries if needed
      input: {
        main: './src/main.js', // Main dashboard entry
        // Add more entries if needed, e.g., 'analytics': './src/analytics.js'
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          const dir = getDirFromAsset(assetInfo);
          return `${dir}/[name].[hash][extname]`;
        },
      },
    },
  },
});