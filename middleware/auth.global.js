export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig();
    const auth = config.public.auth;
   if (auth === "fakebackend") {
      
      const publicPages = ["/login", "/register", "/forgot-password", "/otp", "/reset-password", "/visiteur-form", "/visiteur-save", "/qrcode"];
      const authPage = !publicPages.includes(to.fullPath);
      if (typeof window !== "undefined") {
        const token = useCookie('access_token');
        
  
        if (authPage && !token) {
        //   localStorage.setItem('redirect_after_login', to.fullPath);
          return navigateTo({ path: "/login" });
        }
      }
    }
  });
  