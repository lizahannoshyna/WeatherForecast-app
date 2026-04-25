import React, { useEffect, useState } from 'react';
import axios from "axios";
import Container from "../Container";
import NewsArticle from './NewsArticle';



const News = ({ city }) => { 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const searchQuery = city ? `${city} news` : 'pets OR dogs OR cats';

                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: searchQuery,
                        pageSize: 20,
                        language: 'en', 
                        apiKey: import.meta.env.VITE_NEWS_API_KEY
                    }
                });
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error in Axios", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [city]); 

    return (
        <section className="py-12">
            <Container>
                <h3 className="text-2xl font-semibold mb-8">
                    {city ? `Latest news in ${city}` : "Interacting with our pets"}
                </h3>
                {loading ? (
                    <p>Loading news...</p>
                ) : (
                    <NewsArticle items={articles} />
                )}
            </Container>
        </section>
    );
};

export default News;