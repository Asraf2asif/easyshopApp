import React, { useState } from 'react';
import { Carousel, Image, Modal } from 'react-bootstrap';

function ProductImg({ images, image, name }) {
  const [modalShow, setModalShow] = useState(false);
  const [currImg, setCurrImg] = useState(image);
  return images && images.length > 0 ? (
    <>
      <Carousel pause='hover' interval={300000} fade={false}>
        <Carousel.Item
          onClick={() => {
            setCurrImg(image);
            setModalShow(true);
          }}
          className='pointer'
        >
          <div className='carousel-img-container'>
            <div
              className='img background-size-contain border-0'
              style={{
                backgroundImage: `url(${image})`,
                backgroundColor: 'white',
              }}
            ></div>
          </div>
        </Carousel.Item>
        {images.map((img, idx) => (
          <Carousel.Item
            key={idx}
            onClick={() => {
              setCurrImg(img);
              setModalShow(true);
            }}
            className='pointer'
          >
            <div className='carousel-img-container'>
              <div
                className='img background-size-contain border-0'
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundColor: 'white',
                }}
              ></div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <ImageModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        heading={name}
        img={currImg}
      />
    </>
  ) : (
    <Image src={image} alt={name} fluid />
  );
}

function ImageModel(props) {
  const { img, heading = 'Product heading' } = props;
  return (
    <Modal {...props} size='lg' aria-labelledby='image-model' centered>
      <Modal.Body
        as={Image}
        className='p-0 img-fluid bg-white'
        src={img}
        alt={heading}
      ></Modal.Body>
    </Modal>
  );
}

export {ProductImg}
