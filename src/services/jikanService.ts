const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

export async function getRandomAnimeCharacter() {
  try {
    // Buscar un anime aleatorio (usamos la lista popular para evitar errores)
    const animeResponse = await fetch(`${JIKAN_BASE_URL}/anime?order_by=popularity&limit=25`);
    const animeData = await animeResponse.json();
    const randomAnime = animeData.data[Math.floor(Math.random() * animeData.data.length)];

    // Buscar personajes del anime
    const charactersResponse = await fetch(`${JIKAN_BASE_URL}/anime/${randomAnime.mal_id}/characters`);
    const charactersData = await charactersResponse.json();

    // Escoger un personaje aleatorio
    const randomCharacter = charactersData.data[Math.floor(Math.random() * charactersData.data.length)];

    return {
      name: randomCharacter.character.name,
      image: randomCharacter.character.images.webp.image_url // Imagen del personaje
    };
  } catch (error) {
    console.error("Error obteniendo personaje de Jikan:", error);
    return null;
  }
}
