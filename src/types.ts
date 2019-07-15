import { WordSet } from "./wordbot-client";

export type Vocabulary = { [key in WordSet]?: string[] };

export type RhymableLine = {
  line: string;
  rhyme: string;
};

export type Line = {
  line: string;
  lastWord: string;
};

export type Stanza = {
  lines: [string, string, string, string];
  rhymeA: string;
  rhymeB: string;
};

export type StanzaFormat = BalladStanzaFormat | DecimaStanzaFormat;

export type BalladStanzaFormat = [LineFormat, LineFormat, LineFormat, LineFormat];
export type DecimaStanzaFormat = [
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat,
  LineFormat
];

export enum LineFormat {
  VerbAdjectiveNoun = "%verb% the %adjective% %noun%",
  RhetoricalPersonVerb = "%rhetorical_past% %person% %verb%?",
  ExclamationRhymeA = "%exclamation%, the %rhyme_a%!",
  MoodRhymeB = "%mood%... %rhyme_b%.",
  ExclamationRhymeB = "%exclamation%, the %rhyme_b%!",
  MoodRhymeA = "%mood%... %rhyme_a%."
}
