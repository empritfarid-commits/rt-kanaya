import "./globals.css";
export const metadata = { title: "RT Digital", description: "Aplikasi administrasi RT berbasis Firebase" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}
