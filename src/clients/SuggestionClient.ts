import { Suggestion } from "../constants";
import { RemoteSuggestion } from "./constants";

class SuggestionClient {
  BASE_URL = "http://proverbs-api.hub.me:3001";
  SUGGESTION_URL = "/suggestions";

  public async getSuggestions({
    lesson,
    numberOfProverbs,
    excludeSuggestions,
  }: {
    lesson: string;
    numberOfProverbs: number;
    excludeSuggestions: Suggestion[];
  }): Promise<Suggestion[]> {
    try {
      const response = await fetch(this.BASE_URL + this.SUGGESTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lesson, numberOfProverbs, excludeSuggestions }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      const remoteSuggestions: RemoteSuggestion[] = data.suggestions;
      const localSuggestions = remoteSuggestions.map((remoteSuggestion) => ({
        id: remoteSuggestion.id,
        proverb: remoteSuggestion.proverb,
        relation: remoteSuggestion.relation,
      }));
      return localSuggestions;
    } catch (error) {
      throw error;
    }
  }
}

export default SuggestionClient;
export const suggestionClient = new SuggestionClient();
