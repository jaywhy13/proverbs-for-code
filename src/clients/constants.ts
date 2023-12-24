export interface RemoteSuggestion {
  id: string;
  proverb: RemoteProverb;
  relation: string;
}

export interface RemoteProverb {
  text: string;
  meaning: string;
}
