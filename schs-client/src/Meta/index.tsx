import React, { useEffect } from 'react';

interface PageProps {
  title: string;
  description: string;
}

const Page: React.FC<PageProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description;
    document.head.appendChild(metaDescription);

    // Remove the meta tag when the component unmounts
    return () => {
      document.title = 'Default Title';
      document.head.removeChild(metaDescription);
    };
  }, [title, description]);

  return null; // The Page component doesn't render any content itself
};

export default Page;
