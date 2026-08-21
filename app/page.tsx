"use client";
import AppShell from "@/components/AppShell";
import { Users, Package, ClipboardList, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function Dashboard(){
 const [warga,setWarga]=useState(0),[inventaris,setInventaris]=useState(0),[pinjam,setPinjam]=useState(0);
 useEffect(()=>{const a=onSnapshot(collection(db,"warga"),s=>setWarga(s.size));const b=onSnapshot(collection(db,"inventaris"),s=>setInventaris(s.size));const c=onSnapshot(collection(db,"peminjaman"),s=>setPinjam(s.docs.filter(d=>["Menunggu","Sedang Dipinjam","Terlambat"].includes(d.data().status)).length));return()=>{a();b();c()}},[]);
 const cards=[[Users,"Total Warga",warga,"/warga"],[Package,"Inventaris",inventaris,"/inventaris"],[ClipboardList,"Peminjaman Aktif",pinjam,"/peminjaman"],[Wallet,"Saldo Kas","Rp 0","/kas"]] as const;
 return <AppShell><div className="mb-6"><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-slate-500">Ringkasan administrasi RT.</p></div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{cards.map(([Icon,title,value,href])=><Link href={href} key={title} className="card p-5 hover:shadow-md transition"><div className="flex justify-between"><div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center"><Icon size={20}/></div><ArrowRight size={18} className="text-slate-400"/></div><div className="text-2xl font-bold mt-5">{value}</div><div className="text-sm text-slate-500">{title}</div></Link>)}</div>
 <div className="card p-5 mt-6"><h2 className="font-bold">Selamat datang 👋</h2><p className="text-slate-500 text-sm mt-1">Mulai dengan menambahkan data warga dan inventaris RT.</p></div>
 </AppShell>
}
