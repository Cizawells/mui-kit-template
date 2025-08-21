export interface PaysResponse {
  data: {
    contents: {
      id: string;
      code: string;
      designation: string;
      nationalite: string;
      continent: string;
    }[];
  };
  message: string;
  statusCode: number;
}
export type Pays = {
  id?: string;
  code: string;
  libelle: string;
  nationalite: string;
  continent: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL; // <- env variable

export async function fetchPays(): Promise<PaysResponse> {
  const res = await fetch(`${API_URL}/pays`); // Replace with your API endpoint
  if (!res.ok) throw new Error('Failed to fetch pays');
  return res.json();
}

export async function savePays(pays: Pays): Promise<Pays> {
  console.log('posting');
  const res = await fetch(`${API_URL}/pays`, {
    method: 'POST', // POST request
    headers: {
      'Content-Type': 'application/json', // Tell the server we're sending JSON
    },
    body: JSON.stringify(pays), // Convert the `pays` object to JSON
  });

  if (!res.ok) {
    throw new Error('Failed to save pays');
  }

  return res.json();
}
