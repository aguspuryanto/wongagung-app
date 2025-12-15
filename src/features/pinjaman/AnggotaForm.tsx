import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { FormData } from "@/types/anggota"

import { 
  getAnggotaList, 
  createAnggota, 
  updateAnggota,
  deleteAnggota,
  uploadAnggotaDocument
} from '@/services/api';

export default function AnggotaForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (formData: FormData) => {
    try {
      // Create new member
      const newMember = await createAnggota(formData);
      
      // If there are files to upload
      if (formData.bpkbFile) {
        await uploadAnggotaDocument(newMember.id, formData.bpkbFile, 'bpkb');
      }
      
      // Handle success
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Pendaftaran Anggota Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Data Pribadi */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    id="nik"
                    placeholder="Masukkan NIK"
                    {...register("nik", { required: "NIK harus diisi" })}
                  />
                  {errors.nik && <p className="text-sm text-red-500">{errors.nik.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    placeholder="Nama lengkap sesuai KTP"
                    {...register("fullName", { required: "Nama lengkap harus diisi" })}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    placeholder="Alamat lengkap"
                    {...register("address", { required: "Alamat harus diisi" })}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    placeholder="Kota domisili"
                    {...register("city", { required: "Kota harus diisi" })}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@contoh.com"
                    {...register("email", { 
                      required: "Email harus diisi",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email tidak valid"
                      }
                    })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor HP</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0812-3456-7890"
                    {...register("phone", { 
                      required: "Nomor HP harus diisi",
                      pattern: {
                        value: /^[0-9\-\+]{9,15}$/,
                        message: "Format nomor HP tidak valid"
                      }
                    })}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Kontak Darurat */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium">Kontak Darurat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Nama Kontak Darurat</Label>
                  <Input
                    id="emergencyName"
                    placeholder="Nama lengkap"
                    {...register("emergencyName", { required: "Nama kontak darurat harus diisi" })}
                  />
                  {errors.emergencyName && <p className="text-sm text-red-500">{errors.emergencyName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Hubungan</Label>
                  <Input
                    id="emergencyRelation"
                    placeholder="Contoh: Suami/Istri/Orang Tua"
                    {...register("emergencyRelation", { required: "Hubungan harus diisi" })}
                  />
                  {errors.emergencyRelation && <p className="text-sm text-red-500">{errors.emergencyRelation.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyAddress">Alamat Kontak Darurat</Label>
                  <Textarea
                    id="emergencyAddress"
                    placeholder="Alamat lengkap"
                    {...register("emergencyAddress", { required: "Alamat kontak darurat harus diisi" })}
                  />
                  {errors.emergencyAddress && <p className="text-sm text-red-500">{errors.emergencyAddress.message}</p>}
                </div>
              </div>
            </div>

            {/* Data Kendaraan */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium">Data Kendaraan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">Nomor Polisi</Label>
                  <Input
                    id="vehicleNumber"
                    placeholder="Contoh: B 1234 ABC"
                    {...register("vehicleNumber", { required: "Nomor polisi harus diisi" })}
                  />
                  {errors.vehicleNumber && <p className="text-sm text-red-500">{errors.vehicleNumber.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engineNumber">Nomor Mesin</Label>
                  <Input
                    id="engineNumber"
                    placeholder="Nomor mesin kendaraan"
                    {...register("engineNumber", { required: "Nomor mesin harus diisi" })}
                  />
                  {errors.engineNumber && <p className="text-sm text-red-500">{errors.engineNumber.message}</p>}
                </div>
              </div>
            </div>

            {/* Persyaratan Dokumen */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium">Persyaratan Dokumen</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasBPKB" {...register("hasBPKB")} />
                  <label
                    htmlFor="hasBPKB"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    BPKB (fisik)
                  </label>
                </div>

                <div className="space-y-2 pl-6">
                  <Label htmlFor="bpkbFile">Upload BPKB</Label>
                  <Input 
                    id="bpkbFile" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register("bpkbFile")}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="hasSTNK" {...register("hasSTNK")} />
                  <label
                    htmlFor="hasSTNK"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Fotocopy STNK
                  </label>
                </div>

                <div className="space-y-2 pl-6">
                  <Label htmlFor="stnkFile">Upload STNK</Label>
                  <Input 
                    id="stnkFile" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register("stnkFile")}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="hasKTP" {...register("hasKTP")} />
                  <label
                    htmlFor="hasKTP"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Fotocopy KTP
                  </label>
                </div>

                <div className="space-y-2 pl-6">
                  <Label htmlFor="ktpFile">Upload KTP</Label>
                  <Input 
                    id="ktpFile" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register("ktpFile")}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit">Daftar Anggota</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}