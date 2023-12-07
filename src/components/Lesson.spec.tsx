import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Lesson from "./Lesson";

describe("Lesson component", () => {
  it("displays the correct lesson value", () => {
    const lesson = "This is a lesson";
    render(<Lesson lesson={lesson} handleLessonChanged={() => {}} />);
    const textarea = screen.getByDisplayValue(lesson);
    expect(textarea).not.toBeUndefined();
  });

  it("calls handleLessonChanged when the textarea value changes", () => {
    const handleLessonChanged = jest.fn();
    render(<Lesson lesson="" handleLessonChanged={handleLessonChanged} />);
    const textarea = screen.getByLabelText(
      "Enter the code you want to get proverbs for.",
    );
    const newLesson = "New lesson";
    fireEvent.change(textarea, { target: { value: newLesson } });
    expect(handleLessonChanged).toHaveBeenCalledWith(newLesson);
  });
});
