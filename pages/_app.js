import AddProductProvider from "@/contexts/AddProductProvider";
import AuthProvider from "@/contexts/AuthProvider";
import StockInProvider from "@/contexts/StockInProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StockInProvider>
              <AddProductProvider>
                <Component {...pageProps} />
                <Toaster position="top-center" />
              </AddProductProvider>
            </StockInProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </StyledEngineProvider>
  );
}
