"use client";
import Sidebar from "./Sidebar";
import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppShell({children}:{children:React.ReactNode}) {
  const {user, loading} = useUser();
  const router = useRouter();
  useEffect(()=>{ if(!loading && !user) router.replace("/login"); },[loading,user,router]);
  if (loading || !user) return <div className="min-h-screen grid place-items-center">Memuat...</div>;
  return <div className="flex min-h-screen"><Sidebar/><main className="flex-1 min-w-0"><header className="h-16 bg-white border-b flex items-center justify-between px-6"><div className="font-semibold">Sistem Administrasi RT</div><div className="text-sm text-slate-500">{user.email}</div></header><section className="p-4 md:p-6 max-w-7xl mx-auto">{children}</section></main></div>;
}
