declare module "rhymes" {
  export type Rhyme = {
    word: string;
    score: number;
    pron: string;
  };

  function rhymes(input: string): Rhyme[];

  export = rhymes;
}
