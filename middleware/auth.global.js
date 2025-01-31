// import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  
  const publicPages = ["/login", "/register", "/forgot-password", "/otp", "/reset-password", "/visiteur-form", "/visiteur-save", "/qrcode", "/form-sortie"];
  const authPage = !publicPages.includes(to.fullPath);

  if (typeof window !== "undefined") {
    // const token = useCookie('token');
    const store = useAuthStore()
    if (authPage && !store.token) {
      return navigateTo({ path: "/login" });
    }
  }
  
  });
  