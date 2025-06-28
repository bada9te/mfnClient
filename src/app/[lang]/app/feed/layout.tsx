export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-wrap justify-center">
            {children}
        </div>
    );
}
