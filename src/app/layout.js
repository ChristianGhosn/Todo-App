import "./globals.css";
import NextAuthSessionProvider from "./providers/provider";
import Navbar from "./components/navbar";

export const metadata = {
  title: "Task App",
  description: "Keep organized with this task app. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
