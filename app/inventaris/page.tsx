"use client";
import AppShell from "@/components/AppShell";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import type { Inventaris } from "@/lib/types";
const empty:Inventaris={kode:"",nama:"",kategori:"",jumlah:1,tersedia:1,kondisi:"Baik"};
export default function InventarisPage(){
 const [rows,setRows]=useState<Inventaris[]>([]),[form,setForm]=useState(empty),[show,setShow]=useState(false);
 useEffect(()=>onSnapshot(collection(db,"inventaris"),s=>setRows(s.docs.map(d=>({id:d.id,...d.data()} as Inventaris)))),[]);
 async function save(e:React.FormEvent){e.preventDefault();await addDoc(collection(db,"inventaris"),form);setForm(empty);setShow(false)}
 return <AppShell><div className="flex justify-between mb-5"><div><h1 className="text-2xl font-bold">Inventaris RT</h1><p className="text-slate-500 text-sm">Kelola barang yang dapat dipinjam warga.</p></div><button className="btn btn-primary" onClick={()=>setShow(true)}>+ Tambah Barang</button></div>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{rows.map(x=><div className="card p-5" key={x.id}><div className="flex justify-between"><span className="badge bg-blue-50 text-blue-700">{x.kode}</span><button className="text-red-600 text-sm" onClick={()=>deleteDoc(doc(db,"inventaris",x.id!))}>Hapus</button></div><h2 className="font-bold text-lg mt-4">{x.nama}</h2><p className="text-sm text-slate-500">{x.kategori} · {x.kondisi}</p><div className="flex justify-between mt-5 text-sm"><span>Stok: <b>{x.jumlah}</b></span><span>Tersedia: <b className="text-green-600">{x.tersedia}</b></span></div><p className="text-xs text-slate-400 mt-3">{x.lokasi||"Lokasi belum diisi"}</p></div>)}</div>
 {rows.length===0&&<div className="card p-10 text-center text-slate-500">Belum ada inventaris.</div>}
 {show&&<Modal title="Tambah Inventaris" onClose={()=>setShow(false)}><form onSubmit={save} className="grid md:grid-cols-2 gap-3">{[["kode","Kode Inventaris"],["nama","Nama Barang"],["kategori","Kategori"],["lokasi","Lokasi"]].map(([k,l])=><div key={k}><label className="text-sm">{l}</label><input className="input mt-1" required value={(form as any)[k]||""} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>)}<div><label className="text-sm">Jumlah</label><input className="input mt-1" type="number" min="1" value={form.jumlah} onChange={e=>setForm({...form,jumlah:+e.target.value,tersedia:+e.target.value})}/></div><div><label className="text-sm">Kondisi</label><select className="input mt-1" value={form.kondisi} onChange={e=>setForm({...form,kondisi:e.target.value as any})}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div><button className="btn btn-primary md:col-span-2">Simpan</button></form></Modal>}
 </AppShell>
}
function Modal({title,onClose,children}:{title:string,onClose:()=>void,children:React.ReactNode}){return <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50"><div className="bg-white rounded-2xl w-full max-w-2xl p-6"><div className="flex justify-between mb-5"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose}>✕</button></div>{children}</div></div>}
