export interface Loan {
  id: string
  memberId: string
  memberName: string
  amount: number
  remaining: number
  tenor: number
  interestRate: number
  monthlyPayment: number
  dueDate: string
  status: 'active' | 'completed' | 'overdue'
  createdAt: string
}