export default defineNuxtRouteMiddleware((to, from) => {
  
  const publicPages = ["/login", "/register", "/forgot-password", "/otp", "/reset-password", "/visiteur-form", "/visiteur-save", "/qrcode"];
  const authPage = !publicPages.includes(to.fullPath);

  if (typeof window !== "undefined") {
    const token = useCookie('token');
    console.log("-------------------------------------------"+ token.value)
    if (authPage && !token.value) {
      return navigateTo({ path: "/login" });
    }
  }
  
  });
  