import Author from './author';

type Post = {
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

export default Post;
