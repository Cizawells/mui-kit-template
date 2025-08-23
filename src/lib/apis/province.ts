export interface ProvinceResponse {
  data: {
    contents: Province[];
  };
  message: string;
  statusCode: number;
}
export interface Province {
  id?: string;
  code: string;
  designation: string;
  reference: string;
  dateDebut: string;
  dateFin: string;
  // Pays?: Pays;
}
export interface Continent {
  value: string;
  key: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL; // <- env variable

export async function fetchProvinces(): Promise<ProvinceResponse> {
  // const res = await fetch(`${API_URL}/provinces`); // Replace with your API endpoint
  // if (!res.ok) throw new Error('Failed to fetch pays');
  return {
     data: {
    contents: [
      {
        id: "1",
  code: "001",
  designation: "des1",
  reference: "ref",
  dateDebut: "date1",
  dateFin: "date2",
      }
    ],
  },
  message: "success",
  statusCode: 200,
  };
}

export async function saveProvince(province: Province): Promise<Province> {
  const res = await fetch(`${API_URL}/province`, {
    method: 'POST', // POST request
    headers: {
      'Content-Type': 'application/json', // Tell the server we're sending JSON
    },
    body: JSON.stringify(province), // Convert the `pays` object to JSON
  });

  if (!res.ok) {
    throw new Error('Failed to save pays');
  }

  return res.json();
}
export async function updateProvince(pays: Province): Promise<Province> {
  console.log('payys', pays);
  const res = await fetch(`${API_URL}/pays/${pays.id}`, {
    method: 'PUT', // POST request
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
export async function deletePays(id: string): Promise<Province> {
  console.log('posting');
  const res = await fetch(`${API_URL}/pays/${id}`, {
    method: 'DELETE', // POST request
    headers: {
      'Content-Type': 'application/json', // Tell the server we're sending JSON
    },
  });

  if (!res.ok) {
    throw new Error('Failed to save pays');
  }

  return res.json();
}
