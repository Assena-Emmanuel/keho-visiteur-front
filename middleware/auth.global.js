import { useAuthStore } from "~/stores/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
  
  const publicPages = ["/login", "/register", "/forgot-password", "/otp", "/reset-password", "/visiteur-form", "/visiteur-save", "/qrcode", "/form-sortie"];
  const authPage = !publicPages.includes(to.fullPath);

  if (typeof window !== "undefined") {
    const authStore = useAuthStore()

    if (authPage && !authStore.token) {
      return navigateTo({ path: "/login" });
    }

    
  }
  
  });
  