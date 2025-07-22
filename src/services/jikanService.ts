import { traducirInglesAEspanol } from "./openaiService";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

export async function getRandomAnimeCharacter() {
  try {
    // Buscar un anime aleatorio (usamos la lista popular para evitar errores)
    // const animeResponse = await fetch(`${JIKAN_BASE_URL}/anime?order_by=popularity&limit=25`);
    // const animeData = await animeResponse.json();
    // const randomAnime = animeData.data[Math.floor(Math.random() * animeData.data.length)];

    const randomOffset = Math.floor(Math.random() * 10000);

    // Buscar personajes del anime
    const charactersResponse = await fetch(`${JIKAN_BASE_URL}/characters/${randomOffset}/full`);

    const charactersData = await charactersResponse.json();


    // Escoger un personaje aleatorio
    // const randomCharacter = charactersData.data[Math.floor(Math.random() * charactersData.data.length)];

    // Procesar el nombre para invertirlo si viene con coma
    // let processedName = randomCharacter.character.name;
    // if (processedName.includes(",")) {
    //   const [lastName, firstName] = processedName.split(",").map((s: any) => s.trim());
    //   processedName = `${firstName} ${lastName}`;
    // }


    // console.log("Personaje obtenido:", processedName);
    // return {
    //   name: processedName,
    //   image: randomCharacter.character.images.webp.image_url // Imagen del personaje
    // };


    const characterAbout = traducirInglesAEspanol(charactersData.data.about) || "Descripción no disponible";

    console.log(characterAbout)

    return {
      name: charactersData.data.name,
      image: charactersData.data.images.jpg.image_url // Imagen del personaje
    };
  } catch (error) {
    console.error("Error obteniendo personaje de Jikan:", error);
    return null;
  }
}
