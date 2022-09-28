import React, { memo, useEffect, useState } from "react";
import "./FiltersSection.css";

function FilterBy({ tags, submitHandler, by, multiple = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const checkboxHandler = (tag) => {
    if (!multiple) {
      setSelectedTags([tag]);
      return;
    }

    const index = selectedTags.findIndex((t) => tag === t);
    if (index === -1) {
      setSelectedTags((oldTags) => [...oldTags, tag]);
      return;
    }

    setSelectedTags((oldTags) => {
      const newTags = [...oldTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  useEffect(() => {
    submitHandler({ [by]: selectedTags });
  }, [selectedTags]);

  return (
    <div className="tags-items">
      <div
        className="items-center"
        onClick={() => setIsOpen((oldValue) => !oldValue)}
      >
        <span className="tags-span">{by.toUpperCase()}</span>
      </div>
      {isOpen && (
        <ul className="tag-container">
          {tags?.map((tag) => (

            <li key={tag}>

            
              <input
                type="checkbox"
                name={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => checkboxHandler(tag)}
              />
              <label htmlFor={tag}>{tag.toUpperCase()}</label>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(FilterBy);
