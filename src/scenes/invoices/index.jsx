import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function FormBuilder() {
  const [formElements, setFormElements] = useState([]);
  const [newOption, setNewOption] = useState('');
  const componentRef = useRef();

  const addInputElement = (elementType, customLabel) => {
    const newElement = {
      type: elementType,
      name: `${elementType}_${formElements.length}`,
      label: customLabel || `Label ${formElements.length + 1}`,
      options: [],
    };
    setFormElements([...formElements, newElement]);
  };

  const addSelectOption = (index) => {
    if (newOption) {
      const updatedFormElements = [...formElements];
      updatedFormElements[index].options.push(newOption);
      setFormElements(updatedFormElements);
      setNewOption('');
    }
  };

  const removeSelectOption = (index, optionIndex) => {
    const updatedFormElements = [...formElements];
    updatedFormElements[index].options.splice(optionIndex, 1);
    setFormElements(updatedFormElements);
  };

 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <button onClick={() => addInputElement('text')}>Add Text Input</button>
      <button onClick={() => addInputElement('select')}>Add Select Input</button>
      <button onClick={handlePrint}>Generate PDF</button>

      <div ref={componentRef}>
        {formElements.map((element, index) => (
          <div key={index}>
            <label htmlFor={element.name}>Label:</label>
            <input
              type="text"
              placeholder="Custom Label"
              value={element.label}
              onChange={(e) => {
                const customLabel = e.target.value;
                const updatedFormElements = [...formElements];
                updatedFormElements[index] = { ...element, label: customLabel };
                setFormElements(updatedFormElements);
              }}
            />
            {element.type === 'text' && (
              <input
                type="text"
                name={element.name}
                id={element.name}
                placeholder={`Text Input ${index + 1}`}
              />
            )}

            {element.type === 'select' && (
              <div>
                <label htmlFor={element.name}>Select Options:</label>
                <input
                  type="text"
                  placeholder="New Option"
                  value={newOption}
                  onChange={(e) => {
                    setNewOption(e.target.value);
                  }}
                />
                <button onClick={() => addSelectOption(index)}>Add</button>
                <ul>
                  {element.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      {option}
                      <button onClick={() => removeSelectOption(index, optionIndex)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <select name={element.name} id={element.name}>
                  {element.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilder;
