/* eslint-disable react/no-children-prop */
import Index from "./page";
import "../assets/styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Index children={children} />
      </body>
    </html>
  );
}
