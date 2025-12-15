const API_URL = "http://localhost:3001";

// Anggota (Members) API
export const getAnggotaList = async () => {
  const res = await fetch(`${API_URL}/anggota`);
  return res.json();
};

export const getAnggotaById = async (id) => {
  const res = await fetch(`${API_URL}/anggota/${id}`);
  return res.json();
};

export const createAnggota = async (data) => {
  const res = await fetch(`${API_URL}/anggota`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAnggota = async (id, data) => {
  const res = await fetch(`${API_URL}/anggota/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAnggota = async (id) => {
  const res = await fetch(`${API_URL}/anggota/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// Upload file for anggota
export const uploadAnggotaDocument = async (id, file, documentType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);
  
  const res = await fetch(`${API_URL}/anggota/${id}/documents`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};