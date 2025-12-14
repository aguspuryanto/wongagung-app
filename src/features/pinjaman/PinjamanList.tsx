import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const loans = [
  {
    id: "1",
    memberName: "John Doe",
    amount: 5000000,
    remaining: 4500000,
    dueDate: "2025-01-15",
    status: "active"
  },
  // Add more loan data or fetch from API
]

export default function PinjamanList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pinjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Anggota</TableHead>
              <TableHead className="text-right">Jumlah Pinjaman</TableHead>
              <TableHead className="text-right">Sisa Pinjaman</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.memberName}</TableCell>
                <TableCell className="text-right">Rp {loan.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right">Rp {loan.remaining.toLocaleString()}</TableCell>
                <TableCell>{new Date(loan.dueDate).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <Badge variant={loan.status === 'active' ? 'default' : 'secondary'}>
                    {loan.status === 'active' ? 'Aktif' : 'Lunas'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}