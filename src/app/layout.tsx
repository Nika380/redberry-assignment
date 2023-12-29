import Index from "./page";
import "../assets/styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Index children={children} />
        </AuthProvider>
      </body>
    </html>
  );
}
