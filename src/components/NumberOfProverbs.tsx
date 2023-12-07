import React from "react";

interface NumberOfProverbsProps {
  numberOfSuggestions: number;
  handleNumberOfSuggestionsUpdated: (numberOfSuggestions: number) => void;
}

const NUMBER_OF_SUGGESTIONS_OPTIONS = [1, 3, 5, 10];

const NumberOfProverbs: React.FC<NumberOfProverbsProps> = ({
  numberOfSuggestions,
  handleNumberOfSuggestionsUpdated,
}) => {
  return (
    <div>
      <label htmlFor="numberOfProverbs">Number of Proverbs</label>
      <select
        id="numberOfProverbs"
        onChange={(event) =>
          handleNumberOfSuggestionsUpdated(Number.parseInt(event.target.value))
        }
        value={numberOfSuggestions}
      >
        {NUMBER_OF_SUGGESTIONS_OPTIONS.map((number) => (
          <option value={number} key={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NumberOfProverbs;
