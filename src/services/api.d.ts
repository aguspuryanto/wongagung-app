// Type definitions for @/services/api

declare module '@/services/api' {
  // Anggota (Member) type
  interface Anggota {
    id: string | number;
    nik: string;
    fullName: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    emergencyName: string;
    emergencyRelation: string;
    emergencyAddress: string;
    vehicleNumber: string;
    engineNumber: string;
    hasBPKB: boolean;
    hasSTNK: boolean;
    hasKTP: boolean;
    bpkbFile?: string;
    stnkFile?: string;
    ktpFile?: string;
    [key: string]: any; // For any additional properties
  }

  // Document upload response
  interface DocumentUploadResponse {
    success: boolean;
    fileUrl: string;
    message?: string;
    error?: string;
  }

  // API Response type
  interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }

  // Anggota API functions
  export const getAnggotaList: () => Promise<ApiResponse<Anggota[]>>;
  export const getAnggotaById: (id: string | number) => Promise<ApiResponse<Anggota>>;
  export const createAnggota: (data: Partial<Anggota>) => Promise<ApiResponse<Anggota>>;
  export const updateAnggota: (id: string | number, data: Partial<Anggota>) => Promise<ApiResponse<Anggota>>;
  export const deleteAnggota: (id: string | number) => Promise<ApiResponse>;
  
  // File upload function
  export const uploadAnggotaDocument: (
    id: string | number, 
    file: File, 
    documentType: string
  ) => Promise<DocumentUploadResponse>;
}
