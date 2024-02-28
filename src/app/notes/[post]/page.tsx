import { getPostBySlug, getAllPosts} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import Container from "@/app/_components/Container/container";
import PostHeader from "@/app/_components/PostHeader/postHeader";
import Header from "@/app/_components/Header/header";
import { Post } from "@/interfaces/post";
import Script from "next/script";
import Link from "next/link";

export default async function Notes({ params }: { params: { post: string } }) {
 const post = await getPostBySlug(params.post) ;
 const markDownContent = await markdownToHtml(post?.content || "content");

 console.log("post: ",post);
  return (
    <main>
      <Script src="/_previewPost.js" strategy="beforeInteractive" />
      <Header />
      <Container>
        {post ? <PostHeader header={post.title} /> : <div></div>}
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: markDownContent }}
        />

        <div style={{ marginTop: "40px" }}>
          <strong>
            <Link href="/notes">Navigate back to all Notes</Link>
          </strong>
        </div>
      </Container>
    </main>
  );
}

type params = {
params: {
slug: string;
	}
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
