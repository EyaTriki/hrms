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
    <div style={styles.formBuilderContainer}>
      <div style={styles.formBuilderHeader}>
        <h2>Form Generator</h2>
        <button style={styles.actionButton} onClick={handlePrint}>
          Generate PDF
        </button>
      </div>

      <div style={styles.formElementsContainer} ref={componentRef}>
        {formElements.map((element, index) => (
          <div key={index} style={styles.formElement}>
            <label htmlFor={element.name} style={styles.elementLabel}>
              Label:
            </label>
            <input
              type="text"
              style={styles.customLabelInput}
              placeholder="Libellé personnalisé"
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
                style={styles.textInput}
                placeholder={`Text input ${index + 1}`}
              />
            )}

            {element.type === 'select' && (
              <div style={styles.selectInput}>
                <label htmlFor={element.name} style={styles.elementLabel}>
                  Select options:
                </label>
                <div style={styles.selectOptionsContainer}>
                  <input
                    type="text"
                    style={styles.newOptionInput}
                    placeholder="Add option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                  />
                  <button style={styles.actionButton} onClick={() => addSelectOption(index)}>
                      Add
                  </button>
                </div>
                <ul style={styles.selectOptionsList}>
                  {element.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      {option}
                      <button style={styles.actionButton} onClick={() => removeSelectOption(index, optionIndex)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <select name={element.name} id={element.name} style={styles.selectDropdown}>
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

      <div style={styles.formBuilderActions}>
        <button style={styles.actionButton} onClick={() => addInputElement('text')}>
          Add text input
        </button>
        <button style={styles.actionButton} onClick={() => addInputElement('select')}>
        Add drop-down menu
        </button>
      </div>
    </div>
  );
}

const styles = {
  formBuilderContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
  },
  formBuilderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  actionButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formElementsContainer: {
    marginBottom: '20px',
  },
  formElement: {
    marginBottom: '20px',
  },
  elementLabel: {
    display: 'block',
    marginBottom: '5px',
  },
  customLabelInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  textInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  selectInput: {
    marginBottom: '10px',
  },
  selectOptionsContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  newOptionInput: {
    flex: '1',
    padding: '8px',
  },
  selectOptionsList: {
    listStyle: 'none',
    padding: '0',
    marginBottom: '10px',
  },
  selectDropdown: {
    width: '100%',
    padding: '8px',
  },
  formBuilderActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default FormBuilder;
