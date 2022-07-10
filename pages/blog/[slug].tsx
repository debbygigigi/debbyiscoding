import Image from 'next/image';
import React from 'react';
import PostType from '../../types/post';
import markdownToHtml from '../../utils/markdownToHtml';
import { getAllPosts, getPostBySlug } from '../api/post';

type Props = {
  post: PostType;
};

export default function BlogPost({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <Image src={post.coverImage.url} alt="cover image" priority width={500} height={300} />
      Photo by <a href={post.coverImage.unsplashAuthorLink}>{post.coverImage.unsplashAuthor}</a> on{' '}
      <a href="https://unsplash.com/s/photos/start?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash
      </a>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
