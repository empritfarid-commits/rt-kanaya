export type Role = "admin" | "pengurus" | "bendahara" | "warga";

export type Warga = {
  id?: string;
  nik: string;
  noKK: string;
  nama: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  tempatLahir?: string;
  tanggalLahir?: string;
  alamat: string;
  pekerjaan?: string;
  noHP?: string;
  status: "Tetap" | "Pendatang" | "Pindah" | "Meninggal";
};

export type Inventaris = {
  id?: string;
  kode: string;
  nama: string;
  kategori: string;
  jumlah: number;
  tersedia: number;
  kondisi: "Baik" | "Rusak Ringan" | "Rusak Berat";
  lokasi?: string;
  tahunPembelian?: number;
  hargaPembelian?: number;
  keterangan?: string;
};

export type Peminjaman = {
  id?: string;
  inventoryId: string;
  inventoryName: string;
  wargaId: string;
  wargaName: string;
  jumlah: number;
  tanggalPinjam: string;
  tanggalKembali: string;
  status: "Menunggu" | "Disetujui" | "Ditolak" | "Sedang Dipinjam" | "Dikembalikan" | "Terlambat" | "Rusak" | "Hilang";
  catatan?: string;
  kondisiSebelum?: string;
  kondisiSesudah?: string;
  disetujuiOleh?: string;
};
