export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" data-theme="black">
    <body>
        {children}
    </body>
    </html>
  );
}


