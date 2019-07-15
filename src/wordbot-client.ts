import Axios, { AxiosInstance } from "axios";

export enum WordSet {
  Adjectives = "adjectives",
  Adverbs = "adverbs",
  All = "all",
  Animals = "animals",
  Cats = "cats",
  Common = "common",
  Default = "default",
  Dinosaurs = "dinosaurs",
  Dogs = "dogs",
  Encouragement = "encouragement",
  Fabrics = "fabrics",
  Flowers = "flowers",
  Fruits = "fruits",
  Gemstones = "gemstones",
  Genres = "genres",
  Horses = "horses",
  Instruments = "instruments",
  Knots = "knots",
  Menu = "menu",
  Metals = "metals",
  Moods = "moods",
  Nouns = "nouns",
  Objects = "objects",
  Occupations = "occupations",
  Prepositions = "prepositions",
  Rhymeless = "rhymeless",
  Sports = "sports",
  Vegetables = "vegetables",
  Verbs = "verbs",
  VerbsPast = "verbs_past",
  Weather = "weather",
  Wrestlers = "wrestlers"
}

export type WordbotResponse = {
  words: string[];
};

class WordbotClient {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = Axios.create({
      baseURL: "https://api.noopschallenge.com/wordbot",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });
  }

  async getRandomWord() {
    const {
      data: { words }
    } = await this.api.get<WordbotResponse>("/");

    return words[0];
  }

  async getRandomWords(count: number, set?: WordSet) {
    const {
      data: { words }
    } = await this.api.get<WordbotResponse>("/", { params: { count, set } });

    return words.filter((word, index, list) => list.indexOf(word) === index);
  }
}

export default WordbotClient;
