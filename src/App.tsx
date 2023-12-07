import React, { useEffect, useState } from "react";
import "./App.css";
import { Suggestion } from "./constants";
import { useGetSuggestedProverbs } from "./hooks/useGetProverbs";
import { SuggestedProverb } from "./components/SuggestedProverb";
import Lesson from "./components/Lesson";

function App() {
  const [lesson, setLesson] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);

  const [numberOfSuggestions, setNumberOfSuggestions] = useState<number>(5);
  const NUMBER_OF_SUGGESTIONS_OPTIONS = [1, 3, 5, 10];

  // Get the suggestions from the useGetProverbs hook
  const {
    loading,
    error,
    suggestions: remoteSuggestions,
    loadSuggestions,
  } = useGetSuggestedProverbs();

  useEffect(() => {
    // Update our local list of suggestions when we have new suggestions
    setSuggestions((previousSuggestions) => [
      ...previousSuggestions,
      ...remoteSuggestions,
    ]);
  }, [remoteSuggestions]);

  useEffect(() => {
    // update all suggestions when there are remote suggestions
    setAllSuggestions((previousSuggestions) => [
      ...previousSuggestions,
      ...remoteSuggestions,
    ]);
  });

  const handleClick = async () => {
    await loadSuggestions(lesson, numberOfSuggestions, allSuggestions);
  };

  const handleNumberOfSuggestionsUpdated = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNumberOfSuggestions(Number.parseInt(event.target.value));
  };

  const handleLoadMore = async () => {
    await loadSuggestions(lesson, numberOfSuggestions, allSuggestions);
  };

  const removeProverb = (id: string) => {
    const suggestionsExceptSpecifiedOne = suggestions.filter(
      (suggestion) => suggestion.id !== id,
    );
    setSuggestions(suggestionsExceptSpecifiedOne);
  };

  const handleClearProverbs = () => {
    setSuggestions([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Lesson lesson={lesson} handleLessonChanged={setLesson} />
        <label htmlFor="numberOfProverbs">Number of Proverbs</label>
        <select
          id="numberOfProverbs"
          onChange={handleNumberOfSuggestionsUpdated}
        >
          {NUMBER_OF_SUGGESTIONS_OPTIONS.map((number) => (
            <option
              value={number}
              key={number}
              selected={number === numberOfSuggestions}
            >
              {number}
            </option>
          ))}
        </select>

        <button onClick={handleClick} disabled={loading}>
          {loading && "Loading"}
          {!loading && "Get Proverb"}
        </button>

        <button onClick={handleClearProverbs}>Clear</button>

        <p style={{ color: "red" }}>{error}</p>

        <h1>Results</h1>
        <div>
          {suggestions.map((suggestion) => (
            <SuggestedProverb
              key={suggestion.id}
              id={suggestion.id}
              proverb={suggestion.proverb.text}
              meaning={suggestion.proverb.meaning}
              relation={suggestion.relation}
              onRemove={() => removeProverb(suggestion.id)}
            />
          ))}
        </div>
        <div>
          <button onClick={handleLoadMore} disabled={loading}>
            Load More
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
