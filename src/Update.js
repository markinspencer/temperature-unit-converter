import * as R from "ramda";

const ACTIONS = {
  LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT",
  RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT",
  LEFT_UNIT_SELECT: "LEFT_SELECT",
  LEFT_UNIT_SELECT: "RIGHT_SELECT"
};

export const leftValueInputAction = value => {
  return {
    type: ACTIONS.LEFT_VALUE_INPUT,
    value
  };
};

export const rightValueInputAction = value => {
  return {
    type: ACTIONS.RIGHT_VALUE_INPUT,
    value
  };
};

export const leftUnitSelectAction = value => {
  return {
    type: ACTIONS.LEFT_UNIT_SELECT,
    value
  };
};

export const rightUnitSelectAction = value => {
  return {
    type: ACTIONS.RIGHT_UNIT_SELECT,
    value
  };
};

const update = (action, model) => {
  switch (action.type) {
    case ACTIONS.LEFT_VALUE_INPUT: {
      if (action.value === "")
        return { ...model, sourceLeft: true, leftValue: "", rightValue: "" };

      const leftValue = toInt(action.value);
      return convert({ ...model, leftValue, sourceLeft: true });
    }
    case ACTIONS.RIGHT_VALUE_INPUT: {
      if (action.value === "")
        return { ...model, sourceLeft: false, leftValue: "", rightValue: "" };

      const rightValue = toInt(action.value);
      return convert({ ...model, rightValue, sourceLeft: false });
    }
    case ACTIONS.LEFT_UNIT_SELECT: {
      const { value: leftUnit } = action;
      return convert({ ...model, leftUnit });
    }
    case ACTIONS.RIGHT_UNIT_SELECT: {
      const { value: rightUnit } = action;
      return convert({ ...model, rightUnit });
    }
    default: {
      return model;
    }
  }
};

const toInt = R.pipe(
  parseInt,
  R.defaultTo(0)
);

const round = number => Math.round(number * 10) / 10;

const convert = model => {
  const { leftValue, leftUnit, rightValue, rightUnit } = model;

  const [fromUnit, fromTemp, toUnit] = model.sourceLeft
    ? [leftUnit, leftValue, rightUnit]
    : [rightUnit, rightValue, leftUnit];

  const convertedValue = R.pipe(
    convertFromToTemp,
    round
  )(fromUnit, toUnit, fromTemp);

  return model.sourceLeft
    ? { ...model, rightValue: convertedValue }
    : { ...model, leftValue: convertedValue };
};

const convertFromToTemp = (fromUnit, toUnit, temp) => {
  const convertFn = R.pathOr(R.identity, [fromUnit, toUnit], UnitConversions);
  return convertFn(temp);
};

const CtoF = temp => (9 / 5) * temp + 32;
const FtoC = temp => (5 / 9) * (temp - 32);
const KtoC = temp => temp - 273.15;
const CtoK = temp => temp + 273.15;

const FtoK = R.pipe(
  FtoC,
  CtoK
);

const KtoF = R.pipe(
  KtoC,
  CtoF
);

const UnitConversions = {
  Celsius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK
  },
  Fahrenheit: {
    Celsius: FtoC,
    Kelvin: FtoK
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF
  }
};

export default update;
