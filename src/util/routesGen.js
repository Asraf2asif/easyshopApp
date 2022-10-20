import React from 'react';
import { Route } from 'react-router-dom';

export function pathsGen(mainRoute, isAdmin = null) {
  mainRoute = isAdmin ? `admin/${mainRoute}` : `${mainRoute}`;
  const srchParam = ['search', mainRoute, ':keyword/:key'];
  const [prm1, prm2] = [':pageNumber', ':sort'];

  const [subPrm1, subPrm2] = [[prm1], [prm2, prm1]];

  const nrmlPath = [
    [mainRoute],
    [mainRoute, ...subPrm1],
    [mainRoute, ...subPrm2],
  ];

  const srchPath = [
    [...srchParam],
    [...srchParam, ...subPrm1],
    [...srchParam, ...subPrm2],
  ];

  return [
    ...nrmlPath.map((pathStr) => pathStr.join('/')),
    ...srchPath.map((pathStr) => pathStr.join('/')),
  ];
}

export function routesGen({ element, paths }) {
  return paths.map((pathStr, idx) => (
    <Route path={`/${pathStr}`} element={element} key={`${idx}-${element}`} />
  ));
}
