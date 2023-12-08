import React from "react";

import { Suggestion } from "../constants";
import { SuggestedProverb } from "./SuggestedProverb";

interface SuggestedProverbsProps {
  suggestions: Suggestion[];
  removeSuggestion: (id: string) => void;
}

const SuggestedProverbs: React.FC<SuggestedProverbsProps> = ({
  suggestions,
  removeSuggestion,
}) => (
  <div>
    {suggestions.map((suggestion) => (
      <SuggestedProverb
        key={suggestion.id}
        id={suggestion.id}
        proverb={suggestion.proverb.text}
        meaning={suggestion.proverb.meaning}
        relation={suggestion.relation}
        onRemove={() => removeSuggestion(suggestion.id)}
      />
    ))}
  </div>
);

export default SuggestedProverbs;
