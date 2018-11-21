import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { div, h1, pre, select, option, input } = hh(h);

const UNITS = ["Celsius", "Fahrenheit", "Kelvin"];

const unitOptions = selectedUnit =>
  R.map(
    unit => option({ selected: selectedUnit === unit, value: unit }, unit),
    UNITS
  );

const unitSection = (dispatch, unit, value) =>
  div({ className: "w-50 ma1" }, [
    input({
      type: "text",
      className: "db w-100 mv2 pa2 input-reset ba",
      value
    }),
    select(
      {
        className: "db w-100 pa2 ba input-reset br1 bg-white ba b--black"
      },
      unitOptions(unit)
    )
  ]);

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
    div({ className: "flex" }, [
      unitSection(dispatch, model.leftUnit, model.leftValue),
      unitSection(dispatch, model.rightUnit, model.rightValue)
    ]),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
