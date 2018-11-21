import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  leftValueInputAction,
  rightValueInputAction,
  leftUnitSelectAction,
  rightUnitSelectAction
} from "./Update";

const { div, h1, pre, select, option, input } = hh(h);

const UNITS = ["Celsius", "Fahrenheit", "Kelvin"];

const unitOptions = selectedUnit =>
  R.map(
    unit => option({ selected: selectedUnit === unit, value: unit }, unit),
    UNITS
  );

const unitSection = (dispatch, unit, value, inputAction, selectAction) =>
  div({ className: "w-40 ma1" }, [
    input({
      value,
      type: "text",
      className: "db w-100 mv2 pa2 input-reset ba",
      oninput: e => dispatch(inputAction(e.target.value))
    }),
    select(
      {
        className: "db w-100 pa2 ba input-reset br1 bg-white ba b--black",
        onchange: e => dispatch(selectAction(e.target.value))
      },
      unitOptions(unit)
    )
  ]);

const view = (dispatch, model) => {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
    div({ className: "flex" }, [
      unitSection(
        dispatch,
        model.leftUnit,
        model.leftValue,
        leftValueInputAction,
        leftUnitSelectAction
      ),
      div({ className: "w-20 mt3 tc" }, "="),
      unitSection(
        dispatch,
        model.rightUnit,
        model.rightValue,
        rightValueInputAction,
        rightUnitSelectAction
      )
    ])
    //pre(JSON.stringify(model, null, 2)) // uncomment in development
  ]);
};

export default view;
