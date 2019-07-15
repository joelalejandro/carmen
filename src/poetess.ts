import rhymes, { Rhyme } from "rhymes";
import { BalladStanzaFormat, Line, LineFormat, RhymableLine, Stanza, Vocabulary } from "./types";
import WordBotClient, { WordSet } from "./wordbot-client";

const randomly = () => (Math.random() < 0.5 ? -1 : 1);

export default class Poetess {
  private readonly wordbot: WordBotClient;
  public vocabulary: Vocabulary;

  constructor() {
    this.wordbot = new WordBotClient();
  }

  async inspire(): Promise<void> {
    console.log("Carmen is getting inspired...");

    this.vocabulary = {
      [WordSet.Verbs]: await this.wordbot.getRandomWords(100, WordSet.Verbs),
      [WordSet.Moods]: await this.wordbot.getRandomWords(100, WordSet.Moods),
      [WordSet.Adjectives]: await this.wordbot.getRandomWords(100, WordSet.Adjectives),
      [WordSet.Nouns]: await this.wordbot.getRandomWords(100, WordSet.Nouns)
    };

    console.log("Carmen says she's ready to write!");
  }

  getWords(...sets: WordSet[]): string[] {
    return sets.map(set => this.vocabulary[set].shift());
  }

  writeLine(template = "%verb% the %adjective% %noun%"): Line {
    const [verb, adjective, noun, mood] = this.getWords(
      WordSet.Verbs,
      WordSet.Adjectives,
      WordSet.Nouns,
      WordSet.Moods
    );

    const rhetoricalPast = ["would", "could", "did", "might", "should"].sort(randomly).shift();
    const person = ["I", "she", "he", "they", "we", "it"].sort(randomly).shift();
    const exclamation = ["Good riddance", "Oh my", "Why", "Darn", "Damned", "Goodness", "Oh", "Ah"]
      .sort(randomly)
      .shift();

    const line = template
      .replace(/%verb%/g, verb)
      .replace(/%adjective%/g, adjective)
      .replace(/%noun%/g, noun)
      .replace(/%rhetorical_past%/g, rhetoricalPast)
      .replace(/%person%/g, person)
      .replace(/%mood%/g, mood)
      .replace(/%exclamation%/g, exclamation);

    const lastWord = line
      .split(" ")
      .pop()
      .replace(/[^A-z]+/g, "");

    return { line, lastWord };
  }

  thinkRhymableLine(template: string): RhymableLine {
    const listOfRhymes: Rhyme[] = [];
    let rhymeFound = false;
    let rhyme: string;

    while (!rhymeFound) {
      const { line, lastWord } = this.writeLine(template);

      listOfRhymes.push(...rhymes(lastWord).filter(rhyme => rhyme.word !== lastWord));

      if (listOfRhymes.length) {
        rhyme = listOfRhymes.shift().word.replace(/\([0-9]+\)/g, "");
        return { line, rhyme };
      }
    }
  }

  writeBalladStanza(
    format: BalladStanzaFormat = [
      LineFormat.RhetoricalPersonVerb,
      LineFormat.VerbAdjectiveNoun,
      LineFormat.MoodRhymeA,
      LineFormat.ExclamationRhymeB
    ]
  ): Stanza {
    const [firstLineFormat, secondLineFormat, thirdLineFormat, fourthLineFormat] = format;

    const { line: lineA, rhyme: rhymeA } = this.thinkRhymableLine(firstLineFormat);
    const { line: lineB, rhyme: rhymeB } = this.thinkRhymableLine(secondLineFormat);
    const lineC = this.writeLine(thirdLineFormat).line.replace(/%rhyme_a%/g, rhymeA);
    const lineD = this.writeLine(fourthLineFormat).line.replace(/%rhyme_b%/g, rhymeB);

    return {
      lines: [lineA, lineB, lineC, lineD],
      rhymeA,
      rhymeB
    };
  }
}
