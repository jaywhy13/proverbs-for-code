import React, { useEffect, useState } from "react";
import "./App.css";
import { Suggestion } from "./constants";
import { useGetSuggestedProverbs } from "./hooks/useGetProverbs";
import Lesson from "./components/Lesson";
import NumberOfProverbs from "./components/NumberOfProverbs";
import SuggestedProverbs from "./components/SuggestedProverbs";

function App() {
  const [lesson, setLesson] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);

  const [numberOfSuggestions, setNumberOfSuggestions] = useState<number>(5);

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

  const handleLoadMore = async () => {
    await loadSuggestions(lesson, numberOfSuggestions, allSuggestions);
  };

  /**
   * Removes the suggestion from the list that we have
   */
  const removeSuggestion = (id: string) => {
    const suggestionsExceptSpecifiedOne = suggestions.filter(
      (suggestion) => suggestion.id !== id,
    );
    setSuggestions(suggestionsExceptSpecifiedOne);
  };

  /**
   * Clears all the proverbs visible on the page
   */
  const handleClearProverbs = () => {
    setSuggestions([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Lesson lesson={lesson} handleLessonChanged={setLesson} />

        <NumberOfProverbs
          numberOfSuggestions={numberOfSuggestions}
          handleNumberOfSuggestionsUpdated={setNumberOfSuggestions}
        />

        <button onClick={handleClick} disabled={loading}>
          {loading && "Loading"}
          {!loading && "Get Proverb"}
        </button>

        <button onClick={handleClearProverbs}>Clear</button>

        <p style={{ color: "red" }}>{error}</p>

        <h1>Results</h1>

        <SuggestedProverbs
          suggestions={suggestions}
          removeSuggestion={removeSuggestion}
        />

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
