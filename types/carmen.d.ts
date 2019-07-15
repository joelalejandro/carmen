import { BalladStanzaFormat, Line, RhymableLine, Stanza, Vocabulary } from "../src/types";
import { WordSet } from "../src/wordbot-client";

declare class Poetess {
  public constructor();

  public vocabulary: Vocabulary;

  async inspire(): Promise<void>;

  getWords(...sets: WordSet[]): string[];
  writeLine(template?: string): Line;
  thinkRhymableLine(template: string): RhymableLine;
  writeBalladStanza(format?: BalladStanzaFormat): Stanza;
}

export { BalladStanzaFormat, Line, RhymableLine, Stanza, Vocabulary, WordSet };
export = Poetess;
