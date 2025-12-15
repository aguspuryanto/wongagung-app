import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { getAnggotaList, Anggota } from "@/services/api"
import AnggotaForm from "@/features/pinjaman/AnggotaForm"
import { formatDate } from "@/lib/utils"

export default function AnggotaPage() {
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnggota = async () => {
    try {
      setLoading(true)
      const response = await getAnggotaList()
      if (response) {
        setAnggotaList(response)
      } else {
        setError('Gagal memuat data anggota')
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Terjadi kesalahan saat memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnggota()
  }, [])

  const handleAddSuccess = (newAnggota: Anggota) => {
    setAnggotaList(prev => [newAnggota, ...prev])
    setIsFormOpen(false)
  }

  if (loading) {
    return <div>Memuat data anggota...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Anggota</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kota</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anggotaList.map((anggota) => (
                <TableRow key={anggota.id}>
                  <TableCell>{anggota.nik}</TableCell>
                  <TableCell className="font-medium">{anggota.fullName}</TableCell>
                  <TableCell>{anggota.address}</TableCell>
                  <TableCell>{anggota.city}</TableCell>
                  <TableCell>{anggota.email}</TableCell>
                  <TableCell>{anggota.phone}</TableCell>
                  <TableCell>{formatDate(anggota.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AnggotaForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSuccess={handleAddSuccess} 
      />
    </div>
  )
}