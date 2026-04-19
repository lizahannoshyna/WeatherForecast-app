import React from "react";

const NewsArticle = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((article, index) => (
        <div key={index} className="news-card">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="rounded-xl"
          />
          <p className="mt-2 font-medium">{article.title}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsArticle;
