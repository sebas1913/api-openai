import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.scss";
import Navbar from "@/UI/organisms/navbar/Navbar";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: "500",
});

export const metadata: Metadata = {
    title: "SIEK GPT",
    description: "SIEK GPT es un chat interactivo impulsado por inteligencia artificial que utiliza la API de OpenAI para ofrecer respuestas rápidas y precisas en tiempo real.",
    keywords: "SIEK GPT, chat IA, inteligencia artificial, OpenAI, API GPT, chat interactivo, tecnología"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <Navbar />
                <main className="main">
                    {children}
                </main>
            </body>
        </html>
    );
}
