import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import NumberOfProverbs from "./NumberOfProverbs";

describe("NumberOfProverbs", () => {
  it("should render the correct number of options", () => {
    render(
      <NumberOfProverbs
        numberOfSuggestions={3}
        handleNumberOfSuggestionsUpdated={() => {}}
      />,
    );

    const selectElement = screen.getByLabelText("Number of Proverbs");
    expect(selectElement.children.length).toBe(4); // 4 options: 1, 3, 5, 10
  });

  it("should call handleNumberOfSuggestionsUpdated when an option is selected", () => {
    const handleNumberOfSuggestionsUpdated = jest.fn();
    render(
      <NumberOfProverbs
        numberOfSuggestions={3}
        handleNumberOfSuggestionsUpdated={handleNumberOfSuggestionsUpdated}
      />,
    );

    const selectElement = screen.getByLabelText("Number of Proverbs");
    fireEvent.change(selectElement, { target: { value: "5" } });

    expect(handleNumberOfSuggestionsUpdated).toHaveBeenCalledWith(5);
  });

  it("should display the correct selected option", () => {
    render(
      <NumberOfProverbs
        numberOfSuggestions={5}
        handleNumberOfSuggestionsUpdated={() => {}}
      />,
    );

    const selectElement = screen.getByDisplayValue("5");
    expect(selectElement).not.toBeUndefined();
  });
});
