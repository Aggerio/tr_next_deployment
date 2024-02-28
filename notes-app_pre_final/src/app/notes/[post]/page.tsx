"use client";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostContentBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import Container from "@/app/_components/Container/container";
import PostHeader from "@/app/_components/PostHeader/postHeader";
import Link from "next/link";
import Header from "@/app/_components/Header/header";
import { Post } from "@/interfaces/post";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function Notes({ params }: { params: { post: string } }) {
  const [content, setContent] = useState("");
  const [post, setPost] = useState<Post | null>();

  useEffect(() => {
    async function getData() {
      const post = await getPostBySlug(params.post);
      if (!post) {
        return notFound();
      }
      setPost(post);

      let content = await markdownToHtml(post.content || "");
      setContent(content);

      const title = post.title;

      const regex = /\[\[(.*?)\]\]/g;
      const matches = content.match(regex);
      // console.log(matches);
      let counter = 1;

      let temp_content = content;
      if (matches) {
        for (let i = 0; i < matches.length; ++i) {
          const ttle = matches[i].split("[[")[1].split("]]")[0];
          const index = temp_content.indexOf(matches[i]);
          const len = matches[i].length;
          const previewContent = await getPostContentBySlug(
            ttle.replaceAll(" ", "%20")
          );

          const tmp_str = `${temp_content.substring(
            0,
            index
          )} <span><a style="font-weight: bold;" href="${(previewContent != '')?"/notes/" + ttle.replaceAll(" ","%20"):""} " onmouseenter="handleIn('mydiv${counter}', '${ttle.replaceAll('\'', '\\\'')}', '${previewContent.replaceAll('\'', '\\\'').replaceAll("\"", "\\\"")}')"
               onmouseleave="handleOut('mydiv${counter}')">
        ${ttle} 
</a></span>
        <div style= 'display:none;' id='mydiv${counter}'></div> ${temp_content.substring(
            index + len,
            temp_content.length 
          )}`;
          console.log(tmp_str);
          temp_content = tmp_str;
          counter += 1;

        }

        setContent(temp_content);
      }
    }
    getData();
  }, []);

  return (
    <main>
      <Script src="/_previewPost.js" strategy="beforeInteractive" />
      <Header />
      <Container>
        {post ? <PostHeader header={post.title} /> : <div></div>}
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
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
