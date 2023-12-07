import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SuggestedProverb, SuggestedProverbProps } from "./SuggestedProverb";
import { v4 } from "uuid";

describe("SuggestedProverb", () => {
  const defaultProps: SuggestedProverbProps = {
    id: v4(),
    proverb: "This is the proverb",
    meaning: "This be the meaning",
    relation: "This is the relation",
    onRemove: jest.fn(),
  };

  it("should show the proverb", () => {
    render(<SuggestedProverb {...defaultProps} />);
    const { proverb } = defaultProps;
    expect(screen.getByText(proverb)).toBeInTheDocument();
  });

  it("should show the meaning", () => {
    render(<SuggestedProverb {...defaultProps} />);
    const { meaning } = defaultProps;
    expect(screen.getByText(meaning)).toBeInTheDocument();
  });

  it("should show the relation", () => {
    render(<SuggestedProverb {...defaultProps} />);
    const { relation } = defaultProps;
    expect(screen.getByText(relation)).toBeInTheDocument();
  });

  it('onRemove is called when the user clicks the "Remove" button', () => {
    const onRemove = jest.fn();
    render(<SuggestedProverb {...defaultProps} onRemove={onRemove} />);

    fireEvent.click(screen.getByText("Remove"));

    expect(onRemove).toHaveBeenCalled();
  });
});
