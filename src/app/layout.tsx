import './globals.css';
import type { ReactNode } from 'react';
export const metadata={title:'Хлеб — каталог',description:'Каталог хлеба и выпечки'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="ru"><body>{children}</body></html>}
