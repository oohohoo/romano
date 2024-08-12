import * as esbuild from "esbuild";
import open from 'open';

const context = await esbuild.context({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  // outfile: "dist/index.js",
  target: "esnext",
  bundle: true,
  minify: true,
  platform: "browser",
  external: ['gsap', '@barba/core', 'smooth-scrollbar'],
format: 'esm',
});

// single build
/* await context.rebuild();
context.dispose(); */

// watch and serve
await context.watch();
await context.serve({
  servedir: "./dist",
  port: 3000,
})
.then(() => {
  console.log("Serving in http://localhost:3000");
  open('http://localhost:3000');
})



