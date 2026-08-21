"use client";
import AppShell from "@/components/AppShell";
export default function Kas(){return <AppShell><h1 className="text-2xl font-bold">Kas RT</h1><p className="text-slate-500 mt-1">Modul kas siap dikembangkan: pemasukan, pengeluaran, saldo, dan laporan.</p><div className="grid md:grid-cols-3 gap-4 mt-6">{["Total Pemasukan","Total Pengeluaran","Saldo"].map(x=><div className="card p-5" key={x}><div className="text-sm text-slate-500">{x}</div><div className="text-2xl font-bold mt-2">Rp 0</div></div>)}</div></AppShell>}
