export function simulasiAngsuran(pokok: number, tenor: number, bungaPerBulan: number) {
  const bunga = Math.round(pokok * bungaPerBulan * tenor)
  const total = pokok + bunga
  const perBulan = Math.round(total / tenor)
  
  return {
    bunga,
    total,
    perBulan,
    bungaRate: bungaPerBulan * 12 // Annual rate
  }
}