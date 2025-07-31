import React, { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from 'react-i18next';
import Footer from "../components/Footer"

// Import assets
import blogCardImage from '../assets/images/blog-card.png';;

function Blog() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showViewCard, setShowViewCard] = useState(false);

  const itemsPerPage = 9;
  const totalPages = 3;

  // Sample blog data
  const blogPosts = [
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
    },
    {
      id: 3,
      title: "How to Choose the Perfect Venue for Your Event",
      description:
        "A comprehensive guide to selecting the right venue that matches your event's vision and budget.",
      date: "March 10, 2024",
      author: "Michael Brown",
      category: "Planning",
      readTime: "6 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 4,
      title: "Maximizing Your Event Budget: Tips from Industry Experts",
      description:
        "Learn how to get the most value from your event budget with these proven strategies.",
      date: "March 8, 2024",
      author: "Jennifer Wilson",
      category: "Budget",
      readTime: "3 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 5,
      title: "The Art of Event Photography: Capturing Perfect Moments",
      description:
        "Professional tips for capturing stunning event photos that tell your story.",
      date: "March 5, 2024",
      author: "David Lee",
      category: "Photography",
      readTime: "7 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 6,
      title: "Sustainable Event Planning: Going Green Without Compromise",
      description:
        "How to create memorable events while maintaining environmental responsibility.",
      date: "March 3, 2024",
      author: "Lisa Thompson",
      category: "Sustainability",
      readTime: "5 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 7,
      title: "Corporate Events That Drive Results: Best Practices",
      description:
        "Transform your corporate events into powerful business tools with these strategies.",
      date: "March 1, 2024",
      author: "Robert Garcia",
      category: "Corporate",
      readTime: "4 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 8,
      title: "Social Media Marketing for Event Professionals",
      description:
        "Leverage social media to grow your event business and engage with your audience.",
      date: "February 28, 2024",
      author: "Amanda Clark",
      category: "Marketing",
      readTime: "6 min read",
      image: "/assets/blog-card.png",
    },
    {
      id: 9,
      title: "The Psychology of Event Design: Creating Memorable Experiences",
      description:
        "Understanding how design elements impact guest emotions and behavior.",
      date: "February 25, 2024",
      author: "Thomas Anderson",
      category: "Design",
      readTime: "8 min read",
      image: "/assets/blog-card.png",
    },
  ];

  const mainPost = blogPosts.find((post) => post.isMain);
  const otherPosts = blogPosts.filter((post) => !post.isMain);

  const handleCardClick = (post) => {
    setSelectedCard(post);
    setShowViewCard(true);
  };

  const handleBackToBlog = () => {
    setShowViewCard(false);
    setSelectedCard(null);
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
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === currentPage
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
        <div
          className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start cursor-pointer group"
          onClick={() => handleCardClick(post)}
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
        </div>
      );
    }

    return (
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => handleCardClick(post)}
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="flex items-center">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
            </div>
            <span className="text-gray-600 font-medium text-xs sm:text-sm">{post.author}</span>
          </div>

          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors leading-tight">
            {post.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors">
            <span className="text-xs sm:text-sm">{t('read_more')}</span>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>
      </div>
    );
  };

  const ViewCard = ({ post }) => {
    const [reviews, setReviews] = useState([
      {
        id: 1,
        name: "Arlene McCoy",
        writtenBy: "Written by",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        likes: 168,
        replies: 5,
        isLiked: true,
        profilePic: "/assets/blog-reviews.png",
      },
      {
        id: 2,
        name: "Arlene McCoy",
        writtenBy: "Written by",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        likes: 168,
        replies: 5,
        isLiked: true,
        profilePic: "/assets/blog-reviews.png",
      },
      {
        id: 3,
        name: "Arlene McCoy",
        writtenBy: "Written by",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        likes: 168,
        replies: 5,
        isLiked: true,
        profilePic: "/assets/blog-reviews.png",
      },
      {
        id: 4,
        name: "Arlene McCoy",
        writtenBy: "Written by",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        likes: 168,
        replies: 5,
        isLiked: true,
        profilePic: "/assets/blog-reviews.png",
      },
    ]);

    const handleLike = (reviewId) => {
      setReviews(
        reviews.map((review) => {
          if (review.id === reviewId) {
            return {
              ...review,
              isLiked: !review.isLiked,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            };
          }
          return review;
        })
      );
    };

    const ReviewCard = ({ review }) => {
      return (
        <div className="w-full border-b border-gray-200 pb-6 mb-6 last:border-b-0">
          <div className="flex items-start space-x-4">
            <img
              src={review.profilePic}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <span className="text-sm text-gray-500">
                  {review.writtenBy}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {review.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(review.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors group"
                  >
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        review.isLiked
                          ? "text-primary-500 fill-primary-500"
                          : "text-gray-600 group-hover:text-primary-500"
                      }`}
                      fill={review.isLiked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3v11z"
                      />
                    </svg>
                    <span
                      className={`text-sm font-medium ${
                        review.isLiked ? "text-primary-500" : "text-gray-600"
                      }`}
                    >
                      {review.likes}
                    </span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {review.replies} Replies
                    </span>
                  </button>
                </div>
                <button className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <button
            onClick={handleBackToBlog}
            className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6 sm:mb-8 group"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:-translate-x-1"
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
            <span className="font-medium text-sm sm:text-base">{t('back_to_blog')}</span>
          </button>

          {/* Title and Social Icons */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8 space-y-4 md:space-y-0 flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight flex-1 sm:pr-8">
              {post.title}
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Twitter */}
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-brand hover:text-white transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              {/* LinkedIn */}
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-brand text-white rounded-full flex items-center justify-center hover:bg-gradient-brand transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              {/* GitHub */}
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-brand hover:text-white transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.518 1.97-.644 2.454-.233.895-.866 2.023-1.294 2.709.974.301 2.997.464 4.574.464 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001" />
                </svg>
              </button>
              {/* Dribbble */}
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-brand hover:text-white transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article metadata */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readTime}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-medium text-sm">
                  {post.author
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
              </div>
              <span className="text-gray-700 font-medium">
                {post.author}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            {post.description}
          </p>

          {/* Article Content */}
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <p className="mb-6">
              In the world of marketing and communication, professional events play an essential role in engaging customers, strengthening business relationships, and boosting brand awareness. However, given the complexity of organizations and the demands of guests, coordination, and communication. This is where an all-in-one event management platform (or event management software) can make a difference, providing professionals with comprehensive tools to amplify and optimize the planning, execution, and tracking of their events.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What is an all-in-one event management platform?</h2>
            <p className="mb-6">
              An all-in-one event management platform is a software solution that allows organizers to centralize and manage all aspects of their professional events.
            </p>
            
            <p className="mb-6">
              At the heart of the platform is an online back-office that enables centralized control over all organizational stages of the event. Organizers can manage budgets, send targeted communications, set up personalized agendas, manage participants, automate recurring tasks, and much more.
            </p>
            
            <p className="mb-6">
              In addition, a user-friendly interface is provided to participants, either in the form of an event website and/or a white-labeled mobile application. This allows them to view the agenda, register, access essential information, and interact with other participants, providing an enriched and personalized experience.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Specifically, those that allow you to:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Enhance security level:</strong> french solution hosted in France, creation of custom roles and permissions, automatic deletion of sensitive data collection (RGPD), secure authentication (SSO)...</li>
              <li className="mb-2"><strong>Personalize your event:</strong> white-label platform, customization of email sender name, personalized URL, event app, website...</li>
              <li className="mb-2"><strong>Offer the best possible experience to participants:</strong> interactivities (chat, Q&A, polls...), platform fluidity...</li>
              <li className="mb-2"><strong>Integrate the platform into your digital ecosystem:</strong> integration of APIs and Webhooks</li>
              <li className="mb-2"><strong>Measure campaign and event statistics:</strong> real-time reporting</li>
              <li className="mb-2"><strong>Manage internal ticketing</strong> for company-sponsored events (sponsorship).</li>
            </ul>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('responses')} ({reviews.length})
            </h2>
            
            {/* Subscribe Section */}
            <div className="flex flex-col mb-8">
              <input
                type="email"
                placeholder={t('enter_email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              />
              <button className="w-full bg-gradient-brand text-white px-4 py-3 rounded-xl hover:bg-primary-600 transition-colors font-medium">
                {t('subscribe')}
              </button>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  };

  if (showViewCard && selectedCard) {
    return <ViewCard post={selectedCard} />;
  }

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
        {/* Main Blog Post */}
        {mainPost && (
          <div className="mb-12">
            <BlogCard post={mainPost} isMain={true} />
          </div>
        )}

        {/* Other Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
