"use client";
import "./globals.css";
import FooterMenu from "@/components/footer-menu/footer-menu";
import MainButton from "@/components/main-button/main-button";
import StoreProvider from "./StoreProvider";
import { useUser } from "@/api/hooks";
import SecondaryButton from "@/components/secondary-button/secondary-button";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();

  return (
    <html lang="en">
      <body className="font-body flex items-center flex-col h-screen">
        <StoreProvider>
          <AuthenticateComponent
            // onLogin={() => {
            //   router.push("/login");
            // }}
            // onRegister={() => {
            //   router.push("/register");
            // }}
          >
            {children}
          </AuthenticateComponent>
        </StoreProvider>
      </body>
    </html>
  );
}

const AuthenticateComponent = ({
  children,
  onLogin,
  onRegister,
}: Readonly<{
  children: React.ReactNode;
  onLogin?: () => void;
  onRegister?: () => void;
}>) => {
  const { isAuthenticated } = useUser();
  return (
    <>
      {isAuthenticated && (
        <>
          <div className="w-full p-8">{children}</div>
          <FooterMenu></FooterMenu>
        </>
      )}
      {!isAuthenticated && (
        <div className="p-8 sticky top-full flex justify-around w-full">
          {/* <MainButton onClick={onLogin}>
            <span className="text-nowrap">Login</span>
          </MainButton> */}
          {children}
          <a href="/login">
            <span className="text-nowrap">Login</span>
          </a>
          {/* <SecondaryButton onClick={onRegister}>
            <span className="text-nowrap">Register</span>
          </SecondaryButton> */}
          <a href="/register">
            <span className="text-nowrap">Register</span>
          </a>
        </div>
      )}
    </>
  );
};
