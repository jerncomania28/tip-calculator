import { useState, useEffect } from "react";
import { ReactComponent as Dollar } from "./images/icon-dollar.svg";
import { ReactComponent as Person } from "./images/icon-person.svg";
//styles
import "./styles/App.styles.scss";

const App = () => {
  const [bills, setBills] = useState();
  const [custom, setCustom] = useState(0);
  const [persons, setPersons] = useState();
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0.00);

  const handleReset = () => {
    setBills(0);
    setCustom(0);
    setPersons(0);
    setTip(0);
    setTotal(0);
  };

  const handlePersonsChange = (e) => {
    setPersons(e.target.value);
  };

  const handleCustomChange = (e) => {
    setCustom(e.target.value);
  };

  const handleCustomClick = (e) => {
    setCustom(parseInt(e.target.innerText));
  };

  useEffect(() => {
    if (persons > 0) {
      const newtip = ((custom / 100) * bills) / persons;

      const toDecimal = Number(newtip.toFixed(2));

      setTip(toDecimal);
      setTotal(total + toDecimal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom, bills, persons]);

  const handleBillsChange = (e) => {
    setBills(e.target.value);
  };

  return (
    <div className="tip-calculator">
      <h1 className="heading">
        SPLI <br /> TTER
      </h1>
      <div className="tip-calculator_box">
        <div className="tip-calculator_inputs">
          <div className="tip-calculator_inputs-box">
            <label>Bills</label>
            <br />
            <input
              type="number"
              placeholder="0"
              className="bills-value"
              value={bills}
              onChange={handleBillsChange}
            />
            <Dollar className="icon" />
          </div>
          <div className="tip-calculator_tips_container">
            <small>select tip %</small>
            <div className="tip-calculator_tips">
              {[5, 10, 15, 25, 50].map((tip, index) => {
                return (
                  <div
                    className="tips"
                    key={index}
                    value={tip}
                    onClick={handleCustomClick}
                  >
                    {`${tip}%`}
                  </div>
                );
              })}
              <input
                type="number"
                className="tips custom"
                placeholder="custom"
                onChange={handleCustomChange}
              />
            </div>
          </div>
          <div className="tip-calculator_inputs-box">
            <label>Number of People</label>

            {/* {persons ? "" : <small>can't be zero</small>} */}

            <br />
            <input
              type="number"
              placeholder="0"
              className={persons ? "bills-value" : "bills-value error"}
              onChange={handlePersonsChange}
              value={persons}
            />
            <Person className="icon" />
          </div>
        </div>
        <div className="tip-calculator_results">
          <div className="tip-calculator_results_box">
            <div className="tip-calculator_results_box_values">
              <p>
                Tip Amount <br /> <span>/person</span>
              </p>

              <h1>{`$${tip}`}</h1>
            </div>
            <div className="tip-calculator_results_box_values">
              <p>
                Total <br /> <span>/person</span>
              </p>

              <h1>{`$${total}`}</h1>
            </div>
          </div>
          <div
            className={bills ? "tip-calculator_results_reset" : "disabled"}
            onClick={handleReset}
          >
            RESET
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
