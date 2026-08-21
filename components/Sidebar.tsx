"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, ClipboardList, Wallet, FileText, Megaphone, CalendarDays, LogOut, Home } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const menus = [
  ["Dashboard","/",LayoutDashboard],
  ["Warga","/warga",Users],
  ["Inventaris","/inventaris",Package],
  ["Peminjaman","/peminjaman",ClipboardList],
  ["Kas RT","/kas",Wallet],
  ["Surat","/surat",FileText],
  ["Kegiatan","/kegiatan",CalendarDays],
  ["Pengumuman","/pengumuman",Megaphone]
] as const;

export default function Sidebar() {
  const path = usePathname();
  return <aside className="w-64 min-h-screen bg-slate-950 text-white p-4 hidden md:block">
    <div className="flex items-center gap-3 px-3 py-4 mb-5">
      <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">RT</div>
      <div><div className="font-bold">RT Digital</div><div className="text-xs text-slate-400">Administrasi RT</div></div>
    </div>
    <nav className="space-y-1">
      {menus.map(([label, href, Icon]) => <Link key={href} href={href}
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${path === href ? "bg-blue-600" : "text-slate-300 hover:bg-slate-800"}`}>
        <Icon size={18}/>{label}
      </Link>)}
    </nav>
    <button onClick={() => signOut(auth)} className="mt-8 w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
      <LogOut size={18}/> Keluar
    </button>
  </aside>
}
