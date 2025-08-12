import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import { useTranslation } from 'react-i18next';
import Footer from "../components/Footer";
import api from '../services/api';
import { endPoints } from '../constants/api';


function Blog() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 9;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(endPoints.blog.all);
        const blogData = response.data.data || response.data || [];
        setBlogs(blogData);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
        // Fallback to sample data if API fails
        setBlogs([
          {
            id: 1,
            title: "The Future of Event Management: Embracing Digital Transformation",
            description:
              "Discover how digital technologies are revolutionizing the event management industry and what it means for vendors and clients.",
            date: "March 15, 2024",
            author: "Sarah Johnson",
            category: "Technology",
            readTime: "5 min read",
            image: "/assets/blog-main.png",
            isMain: true,
          },
          {
            id: 2,
            title: "Top 10 Wedding Trends for 2024",
            description:
              "Stay ahead of the curve with the latest wedding trends that are making waves this year.",
            date: "March 12, 2024",
            author: "Emily Davis",
            category: "Wedding",
            readTime: "4 min read",
            image: "/assets/blog-card.png",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [blogs, searchTerm]);

  // Process blogs for main and other posts
  const mainPost = filteredBlogs.length > 0 ? (filteredBlogs.find((post) => post.isMain) || filteredBlogs[0]) : null;
  const otherPosts = filteredBlogs.length > 0 ? filteredBlogs.filter((post, index) => (post._id || post.id) !== (mainPost?._id || mainPost?.id) && index !== 0) : [];
  
  // Pagination calculations
  const totalPages = Math.ceil(otherPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = otherPosts.slice(startIndex, startIndex + itemsPerPage);

  // Search handler
  const handleSearch = (term) => {
    setSearchTerm(term);
  };



  const Pagination = () => {
    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('previous')}
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${page === currentPage
              ? "bg-gradient-to-r from-secondary via-primary-500 to-primary-600 text-white"
              : page === "..."
                ? "text-gray-400 cursor-default"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t('next')}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  const BlogCard = ({ post, isMain = false }) => {
    if (isMain) {
      return (
        <Link
          to={`/blog/${post._id || post.id}`}
          className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start cursor-pointer group"
        >
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl sm:rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm text-gray-500 space-y-2 sm:space-y-0">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readTime}
              </span>
              <span className="text-gray-600 font-medium">{post.author}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-500 transition-colors leading-tight">
              {post.title}
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {post.description}
            </p>

            <button className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-2xl hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 w-fit text-sm sm:text-base">
              <span>{t('read_more')}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </Link>
      );
    }

    // Regular blog card for grid
    return (
      <Link
        to={`/blog/${post._id || post.id}`}
        className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group card-hover-lift"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={post.image || '/assets/blog-card.png'}
            alt={post.title}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
              {post.category || 'General'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(post.date || post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime || '5 min read'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary-500 transition-colors leading-tight line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {post.author || 'Anonymous'}
            </span>
            <span className="text-primary-500 font-medium text-sm group-hover:text-primary-600 transition-colors">
              {t('read_more')} →
            </span>
          </div>
        </div>
      </Link>
    );
  };




  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden pb-8 sm:pb-12">
        {/* Curved gradient background */}
        <div className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white py-16 sm:py-20 lg:py-24 mx-4 sm:mx-6 lg:mx-8 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              {t('news_insights')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('blog_description')}
            </p>
          </div>

          {/* Search Bar positioned at bottom edge */}
          <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-full shadow-xl border border-gray-100 p-2 mx-4 sm:mx-8 md:mx-12 lg:mx-16">
                <div className="flex items-center">
                  <div className="pl-4 sm:pl-6">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={t('search_blog')}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border-none outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-20">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {/* Main Blog Post */}
            {mainPost && (
              <div className="mb-12">
                <BlogCard post={mainPost} isMain={true} />
              </div>
            )}

            {/* Other Blog Posts Grid */}
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedPosts.map((post) => (
                    <BlogCard key={post._id || post.id} post={post} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && <Pagination />}
              </>
            ) : filteredBlogs.length === 0 && searchTerm ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any blogs matching "{searchTerm}"</p>
                <button 
                  onClick={() => handleSearch('')} 
                  className="bg-gradient-to-r from-secondary via-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 transition-all duration-200"
                >
                  Clear Search
                </button>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs available</h3>
                <p className="text-gray-600">Check back later for new content!</p>
              </div>
            ) : null}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
