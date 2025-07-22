export async function traducirInglesAEspanol(texto: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`;

  const response = await fetch(url);
  const data = await response.json();

  return data.responseData.translatedText;
}