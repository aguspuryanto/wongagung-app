// Type definitions for @/services/api

declare module '@/services/api' {
  // Anggota (Member) type
  interface Anggota {
    id?: string | number;
    // Add other member properties here based on your API response
    // For example:
    // nama?: string;
    // alamat?: string;
    // telepon?: string;
    [key: string]: any;
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
  ) => Promise<ApiResponse<{ url: string }>>;
}
