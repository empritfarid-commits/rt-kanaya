"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [register,setRegister]=useState(false);
  const [error,setError]=useState(""); const router=useRouter();
  async function submit(e:React.FormEvent){e.preventDefault();setError("");try{
    if(register) await createUserWithEmailAndPassword(auth,email,password); else await signInWithEmailAndPassword(auth,email,password);
    router.replace("/");
  }catch(err:any){setError(err.message || "Gagal masuk");}}
  return <main className="min-h-screen grid place-items-center p-4"><div className="card p-7 w-full max-w-md">
    <div className="text-center mb-6"><div className="mx-auto h-14 w-14 rounded-2xl bg-blue-600 text-white grid place-items-center font-bold text-xl">RT</div><h1 className="text-2xl font-bold mt-3">RT Digital</h1><p className="text-slate-500 text-sm">Administrasi RT modern</p></div>
    {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">{error}</div>}
    <form onSubmit={submit} className="space-y-4"><div><label className="text-sm">Email</label><input className="input mt-1" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
    <div><label className="text-sm">Password</label><input className="input mt-1" type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required/></div>
    <button className="btn btn-primary w-full">{register ? "Daftar" : "Masuk"}</button></form>
    <button onClick={()=>setRegister(!register)} className="text-blue-600 text-sm w-full mt-4">{register ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}</button>
  </div></main>
}
