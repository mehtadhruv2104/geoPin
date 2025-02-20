/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MAP_TOKEN: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}