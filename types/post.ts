import Author from './author';

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: {
    url: string;
    unsplashAuthorLink: string;
    unsplashAuthor: string;
  };
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export default PostType;
