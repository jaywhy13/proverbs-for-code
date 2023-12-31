import { useState } from "react";
import { suggestionClient } from "../clients/SuggestionClient";
import { Suggestion } from "../constants";

// interface IGetProverbsResponse that returns a list of strings
export interface IGetProverbsResponse {
  loadSuggestions: (
    summary: string,
    numberOfSuggestions: number,
    excludedSuggestions: Suggestion[],
  ) => void;
  suggestions: Suggestion[];
  loading: boolean;
  error?: string;
}
//
export const useGetSuggestedProverbs = (): IGetProverbsResponse => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  //
  const loadSuggestions = async (
    lesson: string,
    numberOfSuggestions: number,
    excludeSuggestions: Array<Suggestion>,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      const remoteSuggestions = await suggestionClient.getSuggestions({
        lesson,
        numberOfProverbs: numberOfSuggestions,
        excludeSuggestions: excludeSuggestions,
      });
      setLoading(false);
      setSuggestions(remoteSuggestions);
    } catch (e) {
      setError("Error loading suggestions: " + e);
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    loadSuggestions,
    error,
  };
};
