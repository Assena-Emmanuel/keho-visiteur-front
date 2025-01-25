export default defineNuxtRouteMiddleware((to, from) => {
  
  const publicPages = ["/login", "/register", "/forgot-password", "/otp", "/reset-password", "/visiteur-form", "/visiteur-save", "/qrcode", "/form-sortie"];
  const authPage = !publicPages.includes(to.fullPath);

  if (typeof window !== "undefined") {
    const token = useCookie('token');
    if (authPage && !token.value) {
      return navigateTo({ path: "/login" });
    }
  }
  
  });
  