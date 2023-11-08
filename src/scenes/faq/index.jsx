import React, { useState } from 'react';

function FAQ() {
  const [formElements, setFormElements] = useState([]);

  const addInputElement = (elementType) => {
    const newElement = {
      type: elementType,
      name: `${elementType}_${formElements.length}`,
    };
    setFormElements([...formElements, newElement]);
  };

  return (
    <div>
      <button onClick={() => addInputElement('text')}>Add Text Input</button>
      <button onClick={() => addInputElement('select')}>Add Select Input</button>
      
      <form>
        {formElements.map((element, index) => (
          <div key={index}>
            {element.type === 'text' && (
              <input type="text" name={element.name} placeholder={`Text Input ${index + 1}`} />
            )}

            {element.type === 'select' && (
              <select name={element.name}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FAQ;
