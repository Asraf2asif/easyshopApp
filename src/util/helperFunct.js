import React from 'react';
import { logout } from '../components/user/redux/actions';

// export const isNumber = (str) => {
//   return str && !isNaN(str);
// };

export const isEmpty = (elem) =>
  (elem && elem.toString().trim() === '') ||
  (isNumber(elem) && Number(elem) === 0) ||
  elem === null ||
  elem === 'undefined' ||
  elem === undefined;

export const setLocalStorage = (name, val) => {
  localStorage.setItem(name, JSON.stringify(val));
};

export const getLocalStorage = (item, emptyState) =>
  localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : emptyState;

export const errorPayload = (error) =>
  error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

export const errDispatch = (error, action, dispatch = null) => {
  const message = errorPayload(error);
  // massage from user middleware
  if (dispatch && message === 'Not authorized, token failed') {
    dispatch(logout());
  }
  dispatch({
    type: action,
    payload: message,
  });
};

export const NestedTag = ({
  tag: { parentTag: ParentTag, childTag: ChildTag },
  tagsProps = [null],
  children,
  ...otherProps
}) => {
  if (!otherProps) {
    otherProps = null;
  }

  return children ? (
    children.length > 1 ? (
      <ParentTag {...otherProps}>
        {children.map((childElem, idx) => {
          let elemProps = {};
          if (tagsProps[idx]) {
            elemProps = tagsProps[idx];
          }

          return (
            childElem && (
              <ChildTag key={idx} {...elemProps}>
                {childElem}
              </ChildTag>
            )
          );
        })}
      </ParentTag>
    ) : (
      <ParentTag {...otherProps}>
        <ChildTag {...tagsProps[0]}>{children}</ChildTag>
      </ParentTag>
    )
  ) : null;
};

export const htmlOptionFromObject = (obj) => {
  return [...Array(obj).keys()].map((key) => (
    <option key={key + 1} value={key + 1}>
      {key + 1}
    </option>
  ));
};

export const excludeKey = (obj, keysToExclude) => {
  const filteredObj = Object.entries(obj).filter(
    (key, _) => keysToExclude.indexOf(key) === -1
  );
  return Object.fromEntries(filteredObj);
};

export const capitalCase = (str) =>
  str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const properCase = (str) =>
  str &&
  str
    .split(' ')
    .map((word) => capitalCase(word))
    .join(' ');

/*
56 = 56
56,000 = 56K
56,00,000 = 56Lac
56,000,000 = 56M
56,00,00,000 = 56Crore
56,000,000,000 = 56B
56,000,000,000,000 = 56T
*/

export function compactNumber(num, config = {}) {
  let { decimal = 2, lac_crore = true, adaptive = true } = config;
  // err handling - start
  decimal = backToDefaultNum(decimal, 2);
  lac_crore = lac_crore !== true && lac_crore !== false ? true : lac_crore;
  adaptive = adaptive !== true && adaptive !== false ? true : adaptive;
  // err handling - end

  // you can customize compact-unit-short
  const short = {
    thousand: 'K',
    lac: 'Lc',
    million: 'M',
    crore: 'Cr',
    billion: 'B',
    trillion: 'T',
  };

  if (isNumber(num)) {
    // smaller than thousand
    const thousand = 1000;
    if (num < thousand) {
      return num;
    }
    // thousand
    const lac = 100000 || 100 * thousand;
    const million = 1000000 || 10 * lac;
    if (
      num >= thousand &&
      (num < lac || (lac_crore === false && num < million))
    ) {
      return adaptiveFloat(num / thousand, decimal, adaptive) + short.thousand;
    }
    // lac
    if (lac_crore === true && num >= lac && num < million) {
      return adaptiveFloat(num / lac, decimal, adaptive) + short.lac;
    }
    // million
    const crore = 10000000 || 100 * lac || 10 * million;
    const billion = 1000000000 || 100 * crore || thousand * million;
    if (
      num >= million &&
      (num < crore || (lac_crore === false && num < billion))
    ) {
      return adaptiveFloat(num / million, decimal, adaptive) + short.million;
    }
    // crore
    if (lac_crore === true && num >= crore && num < billion) {
      return adaptiveFloat(num / crore, decimal, adaptive) + short.crore;
    }
    // billion
    const trillion = 1000000000000 || lac * crore || thousand * billion;
    if (num >= billion && num < trillion) {
      return adaptiveFloat(num / billion, decimal, adaptive) + short.billion;
    }
    // trillion
    if (num >= trillion) {
      return adaptiveFloat(num / trillion, decimal, adaptive) + short.trillion;
    }
  } else {
    return 0;
  }
}

export function adaptiveFloat(num, decimal = 1, adaptive = true) {
  decimal = backToDefaultNum(decimal);
  if (isNumber(num)) {
    if (adaptive === true) {
      if (num % 1 === 0) return num;
      if ((num * 10) % 1 === 0 && decimal >= 1) return num.toFixed(1);
      if ((num * 100) % 1 === 0 && decimal >= 2) return num.toFixed(2);
    }
    return num.toFixed(decimal);
  }
}

export function backToDefaultNum(num, defaultNum = 1, min = 1) {
  return isNumber(num) === false || num < min ? defaultNum : num;
}

export function isNumber(str) {
  return str && !isNaN(str);
}

export const isDateStr = (str) =>
  str && new Date(str) !== 'Invalid Date' && !isNaN(new Date(str));

export const unCamelCase = (str) =>
  str &&
  str
    // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase());

export const userTokenConfig = ({ json = 0, auth = 1, getState = null }) => {
  if (auth === 1 && getState && getState !== null) {
    const {
      userLogin: { userInfo },
    } = getState();

    return {
      headers: {
        ...(json === 1 && { 'Content-Type': 'application/json' }),
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  }

  return {
    headers: {
      ...(json === 1 && { 'Content-Type': 'application/json' }),
      'Access-Control-Allow-Origin': '*',
    },
  };
};
// 'Access-Control-Allow-Headers':
//   'Origin, X-Requested-With, Content-Type, Accept',
// crossorigin: true,

const monthInWords = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

const getDateDetails = (date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  day = day < 10 ? '0' + day : day;
  // month = month < 10 ? '0' + month : month;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  month = monthInWords[month];
  return { year, month, day, hours, minutes, ampm };
};

export const formateDate = (date) => {
  let local = new Date(date);
  // local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  let { year, month, day, hours, minutes, ampm } = getDateDetails(local);
  return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
};

export const styleDelay = (show, elem, delayMSec, styleObj) => {
  return window.setTimeout(
    () => {
      Object.entries(styleObj).forEach(([property, valueList]) => {
        if (
          show === true &&
          elem.style &&
          elem.style[property] !== valueList[0]
        ) {
          elem.style[property] = valueList[0];
        } else if (
          show === false &&
          elem.style &&
          elem.style[property] !== valueList[1]
        ) {
          elem.style[property] = valueList[1];
        }
      });
    },
    show === true ? 0 : show === false && delayMSec
  );
};

export const flattenArr = (arr) =>
  arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flattenArr(toFlatten) : toFlatten),
    []
  );

export const objFilter = (objToFiter, filterFunct) =>
  Object.keys(objToFiter)
    .filter(filterFunct)
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: objToFiter[key],
      });
    }, {});

export const inputType = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

export const cartCalculation = (cartItems = {}, part = 0, price = {}) => {
  let totalItem = 0,
    itemsPrice = 0,
    shippingPrice = 0,
    taxPrice = 0,
    totalPrice = 0;

  if (cartItems === {} || !cartItems) {
    return {
      cartItemList: {},
      totalItem,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  }

  const cartItemList = Object.values(cartItems);

  if (part === 1 || part === 0) {
    for (let i = 0; i < cartItemList.length; i++) {
      totalItem += Number(cartItemList[i].qty);
      itemsPrice += Number(cartItemList[i].qty) * Number(cartItemList[i].price);
    }
  }

  if (part === 2 || part === 0) {
    const addDecimals = (num) => {
      return num && (Math.round(num * 100) / 100).toFixed(2);
    };

    shippingPrice = price.shippingPrice || (itemsPrice / 100) * 8;
    taxPrice = price.taxPrice || 0.15 * itemsPrice;
    totalPrice = itemsPrice + shippingPrice + taxPrice;

    itemsPrice = addDecimals(itemsPrice);
    if (!price.shippingPrice) shippingPrice = addDecimals(shippingPrice);
    if (!price.taxPrice) taxPrice = addDecimals(taxPrice);
    totalPrice = addDecimals(totalPrice);
  }

  if (part === 0) {
    return {
      cartItemList,
      itemsPrice,
      totalItem,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  } else if (part === 1) {
    return {
      cartItemList,
      itemsPrice,
      totalItem,
    };
  } else if (part === 2) {
    return {
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  }
};

export const padLeftEmpty = (arg, padNum) => {
  if (arg) {
    const text = arg.toString();
    const pad =
      padNum - text.length > 0
        ? [...Array(padNum - text.length)].map((_) => '8').join('')
        : '';
    return pad;
  }
};

export const handleFocus = (event) => event.target.select();
