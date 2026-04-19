import React, { useEffect, useState } from 'react';
import axios from "axios";
import Container from "../Container";
import NewsArticle from './NewsArticle';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'pets OR dogs OR cats',
                        pageSize: 4,
                        apiKey: import.meta.env.VITE_NEWS_API_KEY
                    }
                });
                setArticles(response.data.articles)
            } catch (error) {
                console.error("Error in Axios", error)
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [])

    if (loading) return <p>Завантаження...</p>

    return (
        <section className="py-12">
            <Container>
                <h3 className="text-2xl font-semibold mb-8">Interacting with our pets</h3>
                <NewsArticle items={articles} />
            </Container>
        </section>
    )
};

export default News;