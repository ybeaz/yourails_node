import esbuild from 'esbuild'
import { nodeExternals } from 'esbuild-plugin-node-externals'

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    minify: true,
    format: 'cjs',
    outfile: 'dist/lib.min.js',
    plugins: [nodeExternals()],
  })
  .catch(() => process.exit(1))
