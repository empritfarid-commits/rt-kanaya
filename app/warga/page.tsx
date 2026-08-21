"use client";
import AppShell from "@/components/AppShell";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import type { Warga } from "@/lib/types";

const empty:Warga={nik:"",noKK:"",nama:"",jenisKelamin:"Laki-laki",alamat:"",status:"Tetap"};
export default function WargaPage(){
 const [rows,setRows]=useState<Warga[]>([]),[form,setForm]=useState<Warga>(empty),[show,setShow]=useState(false),[q,setQ]=useState("");
 useEffect(()=>onSnapshot(collection(db,"warga"),s=>setRows(s.docs.map(d=>({id:d.id,...d.data()} as Warga)))),[]);
 async function save(e:React.FormEvent){e.preventDefault();await addDoc(collection(db,"warga"),form);setForm(empty);setShow(false)}
 const filtered=rows.filter(x=>(x.nama+x.nik+x.noKK).toLowerCase().includes(q.toLowerCase()));
 return <AppShell><div className="flex flex-wrap gap-3 justify-between mb-5"><div><h1 className="text-2xl font-bold">Data Warga</h1><p className="text-slate-500 text-sm">Kelola data penduduk RT.</p></div><button className="btn btn-primary" onClick={()=>setShow(true)}>+ Tambah Warga</button></div>
 <div className="card p-4 mb-4"><input className="input max-w-md" placeholder="Cari nama, NIK, atau KK..." value={q} onChange={e=>setQ(e.target.value)}/></div>
 <div className="card overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="text-left p-3">Nama</th><th className="text-left p-3">NIK</th><th className="text-left p-3">No. KK</th><th className="text-left p-3">JK</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr></thead><tbody>{filtered.map(x=><tr key={x.id} className="border-t"><td className="p-3 font-medium">{x.nama}</td><td className="p-3">{x.nik}</td><td className="p-3">{x.noKK}</td><td className="p-3">{x.jenisKelamin}</td><td className="p-3">{x.status}</td><td className="p-3 text-right"><button className="text-red-600" onClick={()=>deleteDoc(doc(db,"warga",x.id!))}>Hapus</button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="p-8 text-center text-slate-500">Belum ada data.</div>}</div>
 {show&&<Modal title="Tambah Warga" onClose={()=>setShow(false)}><form onSubmit={save} className="grid md:grid-cols-2 gap-3">{[["nama","Nama Lengkap"],["nik","NIK"],["noKK","No. KK"],["alamat","Alamat"],["pekerjaan","Pekerjaan"],["noHP","No. HP"]].map(([k,l])=><div key={k}><label className="text-sm">{l}</label><input className="input mt-1" required={["nama","nik","noKK","alamat"].includes(k)} value={(form as any)[k]||""} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>)}<div><label className="text-sm">Jenis Kelamin</label><select className="input mt-1" value={form.jenisKelamin} onChange={e=>setForm({...form,jenisKelamin:e.target.value as any})}><option>Laki-laki</option><option>Perempuan</option></select></div><div><label className="text-sm">Status</label><select className="input mt-1" value={form.status} onChange={e=>setForm({...form,status:e.target.value as any})}>{["Tetap","Pendatang","Pindah","Meninggal"].map(x=><option key={x}>{x}</option>)}</select></div><button className="btn btn-primary md:col-span-2">Simpan</button></form></Modal>}
 </AppShell>
}
function Modal({title,onClose,children}:{title:string,onClose:()=>void,children:React.ReactNode}){return <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50"><div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-auto"><div className="flex justify-between mb-5"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose}>✕</button></div>{children}</div></div>}
