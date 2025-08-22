export async function createShipment(data: any) {
  const response = await fetch('/api/shipments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || 'Erro ao gerar etiqueta');
  }

  return response.json();
}
