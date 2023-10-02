import React from "react";

export interface SuggestedProverbProps {
  id: string;
  proverb: string;
  meaning: string;
  relation: string;
  onRemove: (id: string) => void;
}

export const SuggestedProverb: React.FC<SuggestedProverbProps> = ({
  id,
  proverb,
  meaning,
  relation,
  onRemove,
}) => {
  return (
    <div>
      <div>
        <span>Proverb:</span> <span>{proverb}</span>
      </div>
      <div>
        <span>Meaning:</span> <span>{meaning}</span>
      </div>
      <div>
        <span>Relation:</span> <span>{relation}</span>
      </div>
      <button onClick={() => onRemove(id)}> Remove </button>
    </div>
  );
};
