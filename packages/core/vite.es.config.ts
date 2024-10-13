import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts"; // 打包时生成ts的类型声明文件
import { readdirSync, readdir } from "fs";
import { delay, defer, filter, map } from "lodash-es";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // 在 tsconfig.build.json 文件中的 include选项 中配置需要生成类型声明文件的文件
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      // 打包成UMD的时候，期望用户只需要另外引入vue即可，所以包体积要大一些。
      // 打包成es的时候，需要做一些体积优化，所以要设置更多的外部依赖。
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          // 将style.css文件名改为index.css
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        // 分包，将同一个一个文件夹下的文件打包进一个文件
        // id 是从盘符开始的 ***每个文件的*** 绝对路径
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        },
      },
    },
  },
});
