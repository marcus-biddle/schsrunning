import { useState } from 'react';
import { teamImgs } from '../../../assets';
import './styled.css';

export const TeamPhotos = () => {
  return (
    <div className="xc-athlete-page">
        <div className="top-container">
            <div className="xc-athlete-header">
                <p>Cross Country <span>{'>'}</span> Gallery <span>{'>'}</span></p>
                <h1>Team Gallery</h1>
            </div>
            <div className="xc-athlete-desc">
                <p>Below contains all available past photos taken during season. If you have any photos that you'd like added to the collection, <span>please contact admin</span>.</p>
            </div>
        </div>
        <Gallery images={teamImgs} /> 
    </div>
  )
}

interface Image {
    src: string;
    alt: string;
  }
  
  interface GalleryProps {
    images: Image[];
  }
  
  const Gallery = ({ images }: GalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  
    const handleImageClick = (image: Image) => {
      setSelectedImage(image);
    };
  
    return (
      <>
        <div className="gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="modal">
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        )}
      </>
    );
  };