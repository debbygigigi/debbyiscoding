import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Post from '../types/post';
import { getAllPosts } from './api/post';

interface Props {
  posts: Post[];
}

const Index = ({ posts }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hello, I&apos;m Debby ji.</title>
        <meta name="description" content="Hello, I'm Debby ji." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Hello, I&apos;m Debby ji.</h2>
        <div>
          {posts.map((post) => (
            <div className={styles.grid} key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <div className={styles.card}>
                  <Image src={post.coverImage?.url ?? ''} width={300} height={200} alt="xxx" />
                  <h2>{post.title} 123</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts(['title', 'slug', 'coverImage']);

  return { props: { posts } };
};

export default Index;
