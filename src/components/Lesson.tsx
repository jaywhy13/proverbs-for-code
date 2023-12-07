import React from "react";

interface LessonProps {
  lesson: string;
  handleLessonChanged: (lesson: string) => void;
}

const Lesson: React.FC<LessonProps> = ({ lesson, handleLessonChanged }) => {
  return (
    <div>
      <label htmlFor="lesson-input">
        Enter the code you want to get proverbs for.
      </label>
      <textarea
        id="lesson-input"
        rows={5}
        cols={60}
        value={lesson}
        onChange={(e) => handleLessonChanged(e.target.value)}
      />
    </div>
  );
};

export default Lesson;
