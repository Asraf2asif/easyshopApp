import React from 'react';
import { Form, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import RowCol from '../../util/RowCol';

function pageRangeGen(page, pageCount) {
  var start = page - 2,
    end = page + 2;

  if (end > pageCount) {
    start -= end - pageCount;
    end = pageCount;
  }
  if (start <= 0) {
    end += (start - 1) * -1;
    start = 1;
  }
  return { start: start, end: end };
}

const redirectUrlGen = ({
  isAdmin,
  keyword,
  keyName,
  page,
  route,
  routeAdmin,
  sortBy,
}) => {
  let url = [];
  if (isAdmin) {
    url.push('admin');
    if (routeAdmin && routeAdmin !== '') {
      url.push(routeAdmin);
    }
  }
  if (route && route !== '') {
    url.push(route);
  }
  if (keyword && keyword !== '') {
    url.unshift('search');
    url.push(keyword);
  }
  if (keyName && keyName !== '') {
    url.push(keyName);
  }
  if (sortBy && sortBy !== null) {
    url.push(sortBy);
  }
  if (page && page !== '') {
    url.push(page);
  }

  return `/${url.join('/')}`;
};

const PaginateLinkItm = ({ children, ...redirectProps }) => {
  return (
    <LinkContainer to={redirectUrlGen({ ...redirectProps })}>
      {children}
    </LinkContainer>
  );
};

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  keyName = '',
  placement = 'bottom',
  route = false,
  routeAdmin = '',
  sortBy = null,
}) => {
  const { start, end } = pageRangeGen(page, pages);
  const history = useNavigate();
  const defaultPropsRedirects = {
    isAdmin,
    keyword,
    keyName,
    route,
    routeAdmin,
    sortBy,
  };
  const gotoPageHandler = ({ target: { value } }) => {
    history(redirectUrlGen({ page: value, ...defaultPropsRedirects }));
  };
  return (
    pages > 1 && (
      <>
        <hr />
        <RowCol
          className={`paginate${
            placement && placement === 'bottom' ? ' bottom' : ''
          }`}
          colsProps={[
            { sm: 9, xs: 12 },
            { md: 2, sm: 3, xs: 5, className: 'ml-auto mt-3 mt-md-0' },
          ]}
        >
          <Pagination className='flex-wrap'>
            {/* goto First link */}
            <div className='display-flex mb-2  shadow-small'>
              <PaginateLinkItm {...{ page: 1, ...defaultPropsRedirects }}>
                {/* <Pagination.First disabled={page === 1} /> */}
                <Pagination.Item disabled={page === 1}>
                  <i className='fa-solid fa-backward-fast pr-1' />
                  First
                </Pagination.Item>
              </PaginateLinkItm>

              {/* goto Prev link */}
              <PaginateLinkItm
                {...{ page: page - 1, ...defaultPropsRedirects }}
              >
                {/* <Pagination.Prev disabled={page <= 1} /> */}
                <Pagination.Item disabled={page <= 1}>
                  <i className='fa-solid fa-backward pr-1' />
                  Prev
                </Pagination.Item>
              </PaginateLinkItm>
            </div>

            <div className='display-flex mb-2  shadow-small'>
              {/* goto PageNums link */}
              {[...Array(pages).keys()].map((x) => {
                const exclusiveX = x + 1;
                const isXInRange = exclusiveX >= start && exclusiveX <= end;

                return (
                  isXInRange && (
                    <PaginateLinkItm
                      {...{
                        key: exclusiveX,
                        page: exclusiveX,
                        ...defaultPropsRedirects,
                      }}
                    >
                      <Pagination.Item
                        active={exclusiveX === page}
                        activeLabel={` of ${pages}`}
                      >
                        {exclusiveX}
                      </Pagination.Item>
                    </PaginateLinkItm>
                  )
                );
              })}
            </div>
            <div className='display-flex mb-2  shadow-small'>
              {/* goto Next link */}
              <PaginateLinkItm
                {...{ page: page + 1, ...defaultPropsRedirects }}
              >
                {/* <Pagination.Next disabled={page >= pages} /> */}
                <Pagination.Item disabled={page >= pages}>
                  <i className='fa-solid fa-forward pr-1' />
                  Next
                </Pagination.Item>
              </PaginateLinkItm>

              {/* goto Last link */}
              <PaginateLinkItm {...{ page: pages, ...defaultPropsRedirects }}>
                {/* <Pagination.Last disabled={page === pages} /> */}
                <Pagination.Item disabled={page === pages}>
                  <i className='fa-solid fa-forward-fast pr-1' />
                  Last
                </Pagination.Item>
              </PaginateLinkItm>
            </div>
          </Pagination>

          {/* select PageNums */}
          <Form.Control
            size='sm'
            as='select'
            onChange={gotoPageHandler}
            defaultValue={page}
          >
            <option value='0' disabled>
              Page No...
            </option>
            {[...Array(pages).keys()].map((x) => {
              const exclusiveX = x + 1;

              return (
                <option key={exclusiveX} value={exclusiveX}>
                  {exclusiveX}
                </option>
              );
            })}
          </Form.Control>
        </RowCol>
      </>
    )
  );
};

export default Paginate;
