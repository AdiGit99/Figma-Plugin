import * as React from "react";
import { useState } from "react";
import "../styles/ui.css";

declare function require(path: string): any;

const App = ({}) => {
  const textboxFindText = React.useRef<HTMLInputElement>(undefined);
  const textboxReplaceText = React.useRef<HTMLInputElement>(undefined);

  const findTextRef = React.useCallback((element: HTMLInputElement) => {
    textboxFindText.current = element;
  }, []);

  const replaceTextRef = React.useCallback((element: HTMLInputElement) => {
    textboxReplaceText.current = element;
  }, []);

  const onFindAndReplace = () => {
    const findText = textboxFindText.current.value;
    const replaceText = textboxReplaceText.current.value;
    const selection = [];
    for (let i = 0; i < elementsTechnical.length; i++) {
      checkedState[i] ? selection.push(elementsTechnical[i]) : null;
    }
    parent.postMessage(
      {
        pluginMessage: {
          type: "find-and-replace",
          findText,
          replaceText,
          caseSensitive,
          exact,
          selection,
        },
      },
      "*"
    );
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "find-and-replace-error") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  const elements = [
    "Components",
    "Frames",
    "Instances",
    "Groups",
    "Shapes",
    "Vectors",
    "Texts",
  ];

  const elementsTechnical = [
    "COMPONENT",
    "FRAME",
    "INSTANCE",
    "GROUP",
    "POLYGON",
    "VECTOR",
    "TEXT",
  ];
  const [checkedState, setCheckedState] = useState(
    new Array(elements.length).fill(true)
  );

  const [caseSensitive, setCaseSensitive] = useState(true);
  const [exact, setExact] = useState(true);

  const handleChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="plugin-container">
      <div className="find-replace-screen">
        <div className="find-replace-widget">
          <div className="input-container">
            <input
              className="find-replace-input"
              placeholder="Find"
              ref={findTextRef}
            />
            <div className="find-replace-icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </div>
            <input
              className="find-replace-input"
              placeholder="Rename To"
              ref={replaceTextRef}
            />
          </div>
        </div>
        <div className="specification">
          <h4 className="specification-header">Specifications</h4>
          <div className="specification-container">
            <div
              className={`specification-button ${
                caseSensitive ? "element-active" : ""
              }`}
              onClick={() => setCaseSensitive(!caseSensitive)}
            >
              <input
                className="element-checkbox"
                type="checkbox"
                checked={caseSensitive}
              />
              {caseSensitive ? (
                <i className="element-icon tick-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M21 5q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-12 12q-0.289 0.289-0.711 0.289t-0.711-0.289l-6-6q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297 11.289-11.297q0.289-0.289 0.711-0.289z"></path>
                  </svg>
                </i>
              ) : (
                <i className="element-icon cross-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 4q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-6.297 6.289 6.297 6.289q0.289 0.289 0.289 0.711 0 0.43-0.285 0.715t-0.715 0.285q-0.422 0-0.711-0.289l-6.289-6.297-6.289 6.297q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l6.297-6.289-6.297-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l6.289 6.297 6.289-6.297q0.289-0.289 0.711-0.289z"></path>
                  </svg>
                </i>
              )}
              <label className="element-label">Case Sensitive</label>
            </div>
            <div
              className={`specification-button ${
                exact ? "element-active" : ""
              }`}
              onClick={() => setExact(!exact)}
            >
              <input
                className="element-checkbox"
                type="checkbox"
                checked={caseSensitive}
              />
              {exact ? (
                <i className="element-icon tick-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M21 5q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-12 12q-0.289 0.289-0.711 0.289t-0.711-0.289l-6-6q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297 11.289-11.297q0.289-0.289 0.711-0.289z"></path>
                  </svg>
                </i>
              ) : (
                <i className="element-icon cross-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 4q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-6.297 6.289 6.297 6.289q0.289 0.289 0.289 0.711 0 0.43-0.285 0.715t-0.715 0.285q-0.422 0-0.711-0.289l-6.289-6.297-6.289 6.297q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l6.297-6.289-6.297-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l6.289 6.297 6.289-6.297q0.289-0.289 0.711-0.289z"></path>
                  </svg>
                </i>
              )}
              <label className="element-label">Exact</label>
            </div>
          </div>
        </div>
        <div className="element-list">
          <h4 className="element-header">Apply to</h4>
          <div className="element-list-container">
            {elements.map((name, index) => {
              return (
                <div
                  className={`element-button ${
                    checkedState[index] ? "element-active" : ""
                  }`}
                  key={index}
                  onClick={() => handleChecked(index)}
                >
                  <input
                    className="element-checkbox"
                    type="checkbox"
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                  />
                  {checkedState[index] ? (
                    <i className="element-icon tick-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M21 5q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-12 12q-0.289 0.289-0.711 0.289t-0.711-0.289l-6-6q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297 11.289-11.297q0.289-0.289 0.711-0.289z"></path>
                      </svg>
                    </i>
                  ) : (
                    <i className="element-icon cross-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 4q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-6.297 6.289 6.297 6.289q0.289 0.289 0.289 0.711 0 0.43-0.285 0.715t-0.715 0.285q-0.422 0-0.711-0.289l-6.289-6.297-6.289 6.297q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l6.297-6.289-6.297-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l6.289 6.297 6.289-6.297q0.289-0.289 0.711-0.289z"></path>
                      </svg>
                    </i>
                  )}
                  <label className="element-label">{name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="apply-button" onClick={onFindAndReplace}>
        Submit
      </div>
    </div>
  );
};

export default App;
