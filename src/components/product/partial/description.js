import React from 'react';
import Rating from '../../_partial/Rating';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { compactNumber, properCase, padLeftEmpty } from '../../../util/helperFunct';

export const Description = ({
  product: {
    name,
    price,
    rating,
    numReviews,
    description,
    brand,
    category = { name: '', parent: { name: '' } },
    discountPercentage,
  },
}) => {
  const previousPrice = (price / 100) * (100 + discountPercentage);
  const redirectKeyParent = 'category<.>parent<.>name';
  const redirectKeyChildParent = 'category<.>name<~>category<.>parent<.>name';

  // clases
  const subSectionClass = 'col-auto mt-4 pl-0 text-no-wrap pt-2';
  const subHeadClass = 'display-7 font-weight-bold text-black-50 mb-2';
  const infoFilterLink =
    'border-secondary btn btn-outline-dark btn-sm rounded-pill fa-icon-size-xs text-capitalize';

  const ratingDetails = [
    { percent: 5, count: Math.floor(numReviews * (5 / 100)) },
    { percent: 2, count: Math.floor(numReviews * (2 / 100)) },
    { percent: 18, count: Math.floor(numReviews * (18 / 100)) },
    { percent: 10, count: Math.floor(numReviews * (10 / 100)) },
    { percent: 65, count: Math.floor(numReviews * (65 / 100)) },
  ];
  return (
    <div className='p-5'>
      <p className='display-6-5 font-weight-bold mb-1 text-dark'>
        {properCase(name)}
      </p>

      <Row className='mb-1'>
        <Col className='col-auto ml-3 mt-0 mt-4 price-tag products-price px-2 text-no-wrap mr-4'>
          <span className='fa-icon-size font-weight-bold text-dark'>
            ${price}
          </span>
          <i className='center-y-absolute fa-circle fa-solid px-2 text-muted fa-icon-size-xss' />
          <span className='discard fa-icon-size-sm text-black-50'>
            ${Math.floor(previousPrice)}
          </span>
          <span className='fa-icon-size-sm text-black-50 pl-2'>
            ({Math.floor(discountPercentage)}% off)
          </span>
        </Col>
        <Col className={subSectionClass}>
          <Rating
            value={rating}
            text={`${compactNumber(numReviews)} Reviews`}
          />
        </Col>
      </Row>

      <Row>
        <Col className={`${subSectionClass} mr-4`}>
          <p className={subHeadClass}>
            <i className='fa-solid fa-list fa-icon-size-sm' /> Category:
          </p>
          <p className='pt-1'>
            <Link
              to={`/search/page/${category.parent.name}/${redirectKeyParent}`}
              className={infoFilterLink}
            >
              {properCase(category.parent.name)}
            </Link>
            <Link
              to={`/search/page/${category.name}<~>${category.parent.name}/${redirectKeyChildParent}`}
              className={`ml-2 ${infoFilterLink}`}
            >
              {properCase(category.name)}
            </Link>
          </p>
        </Col>

        <Col className={subSectionClass}>
          <p className={subHeadClass}>
            <i className='fa-solid fa-tag fa-icon-size-sm' /> Brand:
          </p>
          <p className='pt-1'>
            <Link
              to={`/search/page/${brand}/brand/name`}
              className={infoFilterLink}
            >
              {properCase(brand)}
            </Link>
          </p>
        </Col>
      </Row>

      <div className='mt-3 pt-2'>
        <p className={subHeadClass}>
          <i className='fa-solid fa-file-invoice fa-icon-size-sm' />{' '}
          Description:
        </p>
        <p className='pt-1'>{description}</p>
      </div>

      <div className='products-ratings pt-3 mt-4'>
        <p className={subHeadClass}>
          <i className='fa-solid fa-star fa-icon-size-sm' /> Ratings:{' '}
        </p>

        <div className='p-2'>
          <Row className='my-2 star-5'>
            <Col className='pl-0 col-auto text-dark'>
              5 <i className='fa-solid fa-star' />
            </Col>
            <Col className='bar-container p-0'>
              <div
                className='bar bar-5'
                style={{ width: `${ratingDetails[4].percent}%` }}
              ></div>
            </Col>
            <Col className='col-auto text-right text-dark' style={{minWidth: '72px'}}>
              {compactNumber(ratingDetails[4].count)}
            </Col>
          </Row>

          <Row className='my-2 star-4'>
            <Col className='pl-0 col-auto text-dark'>
              4 <i className='fa-solid fa-star' />
            </Col>
            <Col className='bar-container p-0'>
              <div
                className='bar bar-4'
                style={{ width: `${ratingDetails[3].percent}%` }}
              ></div>
            </Col>
            <Col className='col-auto text-right text-dark' style={{minWidth: '72px'}}>
              {compactNumber(ratingDetails[3].count)}
            </Col>
          </Row>

          <Row className='my-2 star-3'>
            <Col className='pl-0 col-auto text-dark'>
              3 <i className='fa-solid fa-star' />
            </Col>
            <Col className='bar-container p-0'>
              <div
                className='bar bar-3'
                style={{ width: `${ratingDetails[2].percent}%` }}
              ></div>
            </Col>
            <Col className='col-auto text-right text-dark' style={{minWidth: '72px'}}>
              {compactNumber(ratingDetails[2].count)}
            </Col>
          </Row>

          <Row className='my-2 star-2'>
            <Col className='pl-0 col-auto text-dark'>
              2 <i className='fa-solid fa-star' />
            </Col>
            <Col className='bar-container p-0'>
              <div
                className='bar bar-2'
                style={{ width: `${ratingDetails[1].percent}%` }}
              ></div>
            </Col>
            <Col className='col-auto text-right text-dark' style={{minWidth: '72px'}}>
              {compactNumber(ratingDetails[1].count)}
            </Col>
          </Row>

          <Row className='my-2 star-1'>
            <Col className='pl-0 col-auto text-dark'>
              1 <i className='fa-solid fa-star' />
            </Col>
            <Col className='bar-container p-0'>
              <div
                className='bar bar-1'
                style={{ width: `${ratingDetails[0].percent}%` }}
              ></div>
            </Col>
            <Col className='col-auto text-right text-dark' style={{minWidth: '72px'}}>
              {compactNumber(ratingDetails[0].count)}
            </Col>
          </Row>
          <hr className='mb-2' />
          <Row className='my-2 star-1 text-dark font-weight-bold'>
            <Col className='col-auto pl-0'></Col>
            <Col className='p-0'>
              <i className='fa-solid fa-star fa-icon-size-sm text-dark' />{' '}
              {rating}
            </Col>
            <Col className='col-auto'>{compactNumber(numReviews)}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
