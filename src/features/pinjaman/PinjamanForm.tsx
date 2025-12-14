import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useMemo } from "react"
import { simulasiAngsuran } from "./simulasi"

// Add these imports at the top
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
// import { toast } from "@/components/ui/use-toast"

// Constants
const MAX_INTEREST_RATE = 0.24 // 24% per year
const MONTHS_IN_YEAR = 12

// Generate loan options from 500k to 10M with 500k increments
const generateLoanOptions = () => {
  const options = []
  for (let i = 500000; i <= 10000000; i += 500000) {
    options.push(i)
  }
  return options
}

const LOAN_OPTIONS = generateLoanOptions()

export default function PinjamanForm() {
    const [pokok, setPokok] = useState(1000000)
    const [tenor, setTenor] = useState(12)
    const [bungaPerTahun, setBungaPerTahun] = useState(MAX_INTEREST_RATE) // Default to max rate
    const [showAdvanced, setShowAdvanced] = useState(false)

    // Calculate monthly interest rate
    const bungaPerBulan = useMemo(() => {
        return bungaPerTahun / MONTHS_IN_YEAR
    }, [bungaPerTahun])

    const result = useMemo(() => {
        return simulasiAngsuran(pokok, tenor, bungaPerBulan)
    }, [pokok, tenor, bungaPerBulan])

    // Generate installment schedule
    const angsuranSchedule = useMemo(() => {
    return Array.from({ length: tenor }, (_, i) => {
        const bulan = i + 1
        const pokokPerBulan = Math.round(pokok / tenor)
        const bungaPerBulanValue = Math.round(pokok * bungaPerBulan) // Flat rate based on initial principal
        const totalPerBulan = pokokPerBulan + bungaPerBulanValue
        
        return {
        bulan,
        pokok: pokokPerBulan.toLocaleString(),
        bunga: bungaPerBulanValue.toLocaleString(),
        total: totalPerBulan.toLocaleString()
        }
    })
    }, [pokok, tenor, bungaPerBulan])

    // Add these states
    const [selectedMember, setSelectedMember] = useState<string>("")
    const [members, setMembers] = useState([
    { id: "1", name: "John Doe", nik: "1234567890" },
    { id: "2", name: "Jane Smith", nik: "0987654321" },
    // Add more members or fetch from API
    ])
    const { toast } = useToast()
    const navigate = useNavigate()
    // Add this handler
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember) {
        toast({
        title: "Error",
        description: "Silakan pilih anggota terlebih dahulu",
        variant: "destructive",
        })
        return
    }
    // Here you would typically send the loan application to your backend
    const loanData = {
        memberId: selectedMember,
        amount: pokok,
        tenor,
        interestRate: bungaPerTahun,
        monthlyPayment: result.perBulan,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    }
    console.log("Loan application submitted:", loanData)
    
    // Show success message
    toast({
        title: "Berhasil",
        description: "Pengajuan pinjaman berhasil dikirim",
    })
    // Redirect to dashboard or loans page
    navigate("/dashboard")
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form Section */}
      <Card>
        <CardHeader className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Simulasi Pinjaman</h2>
            <p className="text-sm text-muted-foreground">
              Hitung simulasi pinjaman dengan bunga flat
            </p>
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label>Suku Bunga: {(bungaPerTahun * 100).toFixed(2)}% / tahun</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <Info className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bunga flat maksimum 24% per tahun sesuai ketentuan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[bungaPerTahun * 100]}
              min={0}
              max={MAX_INTEREST_RATE * 100}
              step={0.5}
              onValueChange={([value]) => setBungaPerTahun(value / 100)}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>24%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Jumlah Pinjaman</Label>
            <Select
              value={pokok.toString()}
              onValueChange={(value) => setPokok(Number(value))}
            >
              <SelectTrigger id="loan-amount">
                <SelectValue placeholder="Pilih jumlah pinjaman" />
              </SelectTrigger>
              <SelectContent>
                {LOAN_OPTIONS.map((amount) => (
                  <SelectItem key={amount} value={amount.toString()}>
                    Rp {amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenor">Tenor (bulan)</Label>
            <Input 
              id="tenor"
              type="number" 
              min="1"
              max="36"
              value={tenor} 
              onChange={e => setTenor(Math.min(36, Math.max(1, Number(e.target.value))))} 
              placeholder="Masukkan tenor pinjaman" 
            />
          </div>

            {/* Add member selection field in the form, just below the tenor input */}
            <div className="space-y-2">
            <Label htmlFor="member">Pilih Anggota</Label>
            <Select
                value={selectedMember}
                onValueChange={setSelectedMember}
            >
                <SelectTrigger id="member">
                <SelectValue placeholder="Pilih anggota" />
                </SelectTrigger>
                <SelectContent>
                {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                    {member.name} (NIK: {member.nik})
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex justify-between">
              <span>Total Pinjaman:</span>
              <span className="font-medium">Rp {pokok.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Suku Bunga (Flat):</span>
              <span>{(bungaPerTahun * 100).toFixed(2)}% per tahun</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Bunga:</span>
              <span>Rp {result.bunga.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total Pembayaran:</span>
              <span>Rp {(pokok + result.bunga).toLocaleString()}</span>
            </div>
            <div className="text-center font-semibold text-lg pt-2 bg-primary/10 py-2 rounded-md">
              Angsuran / bulan: Rp {result.perBulan.toLocaleString()}
            </div>
          </div>

          <Button type="submit" className="w-full mt-2">Ajukan Pinjaman</Button>
          </form>
        </CardContent>
      </Card>

      {/* Installment Schedule Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Rincian Angsuran</h3>
          <p className="text-sm text-muted-foreground">
            Total {tenor} bulan angsuran dengan bunga flat {(bungaPerTahun * 100).toFixed(2)}% per tahun
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border max-h-[500px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead>Bulan</TableHead>
                  <TableHead className="text-right">Pokok</TableHead>
                  <TableHead className="text-right">Bunga</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {angsuranSchedule.map((item) => (
                  <TableRow key={item.bulan}>
                    <TableCell>Bulan {item.bulan}</TableCell>
                    <TableCell className="text-right">Rp {item.pokok}</TableCell>
                    <TableCell className="text-right">Rp {item.bunga}</TableCell>
                    <TableCell className="text-right font-medium">Rp {item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}