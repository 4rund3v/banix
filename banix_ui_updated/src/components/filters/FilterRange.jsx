// react
import React, { useCallback, useEffect, useMemo, useState } from "react";

// third-party
import InputRange from "react-input-range";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// application
import Currency from "../shared/Currency";

function getFirstValidValue(...values) {
  return values.reduce(
    (acc, value) => (acc === null && (value || value === 0) ? value : acc),
    null
  );
}

function FilterRange(props) {
  const { data, value, onChangeValue } = props;
  const [propsFrom, propsTo] = value || [];
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState([propsFrom, propsTo]);
  const [stateFrom, stateTo] = state;

  let { min, max } = data;
  let from = Math.max(getFirstValidValue(stateFrom, propsFrom, min), min);
  let to = Math.min(getFirstValidValue(stateTo, propsTo, max), max);
  let fromLabel = from;
  let toLabel = to;

  // Update state from props.
  useEffect(() => {
    setState([propsFrom, propsTo]);
  }, [propsFrom, propsTo]);

  // Clear previous timer.
  useEffect(
    () => () => {
      clearTimeout(timer);
    },
    [timer]
  );

  const handleChange = useCallback(
    (newValue) => {
      let { min: newFrom, max: newTo } = newValue;

      // This is needed to fix a bug in react-input-range.
      [newFrom, newTo] = [Math.max(newFrom, min), Math.min(newTo, max)];

      setState([newFrom, newTo]);

      if (onChangeValue) {
        setTimer(
          setTimeout(() => {
            onChangeValue({ filter: data, value: [newFrom, newTo] });
          }, 250)
        );
      }
    },
    [min, max, data, onChangeValue, setTimer, setState]
  );

  return useMemo(
    () => (
      <div className="filter-price">
        <div className="filter-price__slider" dir="ltr">
          <InputRange
            minValue={min}
            maxValue={max}
            value={{ min: from, max: to }}
            step={1}
            onChange={handleChange}
          />
        </div>
        <div className="filter-price__title">
          Price:{" "}
          <span className="filter-price__min-value">
            <Currency value={fromLabel} />
          </span>
          {" – "}
          <span className="filter-price__max-value">
            <Currency value={toLabel} />
          </span>
        </div>
      </div>
    ),
    [min, max, from, to, fromLabel, toLabel, handleChange]
  );
}

FilterRange.propTypes = {
  /**
   * Filter object.
   */
  data: PropTypes.object,
  /**
   * Value.
   */
  value: PropTypes.arrayOf(PropTypes.number),
  /**
   * Change value callback.
   */
  onChangeValue: PropTypes.func,
  /**
   * Current locale.
   */
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(FilterRange);
