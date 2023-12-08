import React from "react";
import { render, screen } from "@testing-library/react";
import SuggestedProverbs from "./SuggestedProverbs";

const suggestions = [
  {
    id: "1",
    proverb: {
      text: "Actions speak louder than words",
      meaning: "What a person does is more important than what they say.",
    },
    relation: "Similar",
  },
  {
    id: "2",
    proverb: {
      text: "The early bird catches the worm",
      meaning: "The person who arrives first has the best chance of success.",
    },
    relation: "Contrasting",
  },
];

const removeSuggestion = jest.fn();

describe("SuggestedProverbs", () => {
  beforeEach(() => {
    render(
      <SuggestedProverbs
        suggestions={suggestions}
        removeSuggestion={removeSuggestion}
      />,
    );
  });

  it.each(suggestions)(
    "renders the suggested proverb text: s",
    (suggestion) => {
      const proverbElement = screen.getByText(suggestion.proverb.text);
      expect(proverbElement).toBeInTheDocument();
    },
  );
});
