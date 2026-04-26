import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ mode }) => {
   return {
      base: "/calvio/",
      plugins: [
         react({
            jsxImportSource:
               mode === "development"
                  ? "@welldone-software/why-did-you-render"
                  : "react",
         }),
         tailwindcss(),
      ],
      resolve: {
         alias: {
            "@": path.resolve(__dirname, "./src"),
         },
      },
   };
});
