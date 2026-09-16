import { ThemeProvider } from "@/context/ThemeContext";
import { GameProvider } from "@/context/GameContext";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

export const metadata = {
  title: "Cell Odyssey | IB Biology Interactive Arena",
  description: "Next-generation IB Biology interactive learning arena with Team Buzzer Battle, Mystery Cell Reconstruction, and dynamic theme switching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="playful" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <GameProvider>
            <Navbar />
            <main>{children}</main>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
