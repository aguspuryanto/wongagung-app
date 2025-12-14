

export interface FormData {
  // Data Pribadi
  nik: string
  fullName: string
  address: string
  city: string
  email: string
  phone: string
  
  // Kontak Darurat
  emergencyName: string
  emergencyAddress: string
  emergencyRelation: string
  
  // Dokumen Kendaraan
  vehicleNumber: string
  engineNumber: string
  
  // Persyaratan Dokumen
  hasBPKB: boolean
  hasSTNK: boolean
  hasKTP: boolean
  bpkbFile?: FileList
  stnkFile?: FileList
  ktpFile?: FileList
}