import AddProductProvider from "@/contexts/AddProductProvider";
import AuthProvider from "@/contexts/AuthProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AddProductProvider>
            <Component {...pageProps} />
            <Toaster position="top-center" />
          </AddProductProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
