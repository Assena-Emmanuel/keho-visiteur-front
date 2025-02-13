import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth" | "default" | "qrcode-layout" | "utility"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}