import Link from 'next/link';
import type { ReactNode } from 'react';
export default function AdminLayout({children}:{children:ReactNode}){return <div className="admin"><div className="admin-shell"><aside className="sidebar"><div className="logo">HLEBBLACK</div><p style={{color:'#777'}}>Админ-панель</p><Link href="/admin">📦 Каталог</Link><Link href="/admin/categories">📁 Категории</Link><Link href="/">↗ Открыть сайт</Link></aside><main className="admin-main">{children}</main></div></div>}
