import React, { useState, useEffect } from "react";
import './TextContent.css';
import { fetchContent } from '../../services/apiServices';
import Loader from '../Shared/Loader';

function TextContent({ selectedCategory }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchContent(selectedCategory);
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchData();
    }
  }, [selectedCategory]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="content-container">
      {content && content.length > 0 ? (
        content.map((item, index) => (
          <div className="content-card" key={index}>
            <div className="content-header">
              <span className="content-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
            </div>
            <div className="content-body">
              <p className="content-text">{item.text}</p>
              {item.summary && <p className="content-summary">{item.summary}</p>}
              {item.tags && item.tags.length > 0 && (
                <div className="content-tags">
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="content-tag">{tag}</span>
                  ))}
                </div>
              )}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="content-link">
                  View more
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-content">No content available</div>
      )}
    </div>
  );
}

export default TextContent;
