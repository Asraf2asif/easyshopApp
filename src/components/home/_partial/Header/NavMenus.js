import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listNavCategory } from '../../../product/redux/actions';
import { LinkContainer } from 'react-router-bootstrap';
import { capitalCase } from '../../../../util/helperFunct';

const MenuListHolder = ({ children }) => {
  return (
    <div className='nav-menu'>
      <ul className='menu-list'>{children}</ul>
    </div>
  );
};

const MenuItemHolder = ({ children }) => {
  return <li className='menu-item'>{children}</li>;
};

const MenuSubListHolder = ({ align, children }) => {
  return <ul className={`menu-sub-list align-${align}`}>{children}</ul>;
};

const MenuItem = ({ redirectKey, isParent, parentCat, childCat = '' }) => {
  const keyWord = childCat === '' ? parentCat : `${childCat}<~>${parentCat}`;
  return (
    <LinkContainer to={`/search/page/${keyWord}/${redirectKey}/`}>
      <div className='menu-link'>
        <button className={`menu-button ${isParent ? 'parent-btn' : ''}`}>
          {childCat === '' ? parentCat.toUpperCase() : capitalCase(childCat)}
        </button>
      </div>
    </LinkContainer>
  );
};

const MenuSubList = ({ cat, align, redirectKey }) => {
  return (
    cat.child &&
    cat.child.length > 0 && (
      <MenuSubListHolder align={align}>
        {cat.child.map((child, idx) => (
          <MenuItemHolder key={idx}>
            <MenuItem
              redirectKey={redirectKey}
              isParent={false}
              parentCat={cat.name}
              childCat={child}
            />
          </MenuItemHolder>
        ))}
      </MenuSubListHolder>
    )
  );
};

const reCalculateNav = (setCatLength) => {
  if (window.innerWidth > 995) {
    setCatLength(6);
  } else if (window.innerWidth < 995 && window.innerWidth >= 780) {
    setCatLength(3);
  } else if (window.innerWidth < 780 && window.innerWidth >= 770) {
    setCatLength(2);
  } else if (window.innerWidth < 770) {
    setCatLength(0);
  }
};

const NavMenus = () => {
  const { categories = [] } = useSelector((state) => state.navCategory);
  const [catLength, setCatLength] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNavCategory());
    reCalculateNav(setCatLength);
  }, []);

  window.addEventListener('resize', () => {
    reCalculateNav(setCatLength);
  });

  const redirectKeyParent = 'category<.>parent<.>name';
  const redirectKeyChildParent = 'category<.>name<~>category<.>parent<.>name';

  return (
    <>
      {catLength !== 0 &&
        categories && categories.slice(0, catLength).map((cat, idx) => (
          <MenuListHolder key={idx}>
            <MenuItemHolder>
              <MenuItem
                redirectKey={redirectKeyParent}
                isParent={true}
                parentCat={cat.name}
              />
              <MenuSubList
                cat={cat}
                align='bottom'
                redirectKey={redirectKeyChildParent}
              />
            </MenuItemHolder>
          </MenuListHolder>
        ))}
      {catLength < categories.length && (
        <MenuListHolder>
          <MenuItemHolder>
            <a href='#' className='menu-link'>
              <button className='menu-button parent-btn'>
                {catLength === 0
                  ? 'product category'.toUpperCase()
                  : 'more'.toUpperCase()}
              </button>
            </a>
            <MenuSubListHolder align='bottom'>
              {categories
                .slice(catLength, categories.length)
                .map((cat, idx) => (
                  <MenuItemHolder key={idx}>
                    <MenuItem
                      redirectKey={redirectKeyParent}
                      isParent={false}
                      parentCat={cat.name}
                    />
                    <MenuSubList
                      cat={cat}
                      align='right'
                      redirectKey={redirectKeyChildParent}
                    />
                  </MenuItemHolder>
                ))}
            </MenuSubListHolder>
          </MenuItemHolder>
        </MenuListHolder>
      )}
    </>
  );
};

export default NavMenus;
