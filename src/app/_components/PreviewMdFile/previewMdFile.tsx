"use client";
import Link from "next/link";
import Container from "../Container/container";
import { useState, useEffect } from "react";
import { Post } from "@/interfaces/post";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";



export default function PreviewMdFile({
  slug
}: {
  slug: string;
}) {
  // console.log(slug);
  const [hoverEnabled, setHover] = useState(false);
  const [title, setTitle] = useState('');
  const [shortcontent, setShortContent] = useState('');

  function setHoverEnabled(event: any) {
    setHover(true);
    // console.log("Hovered");
  }
  function setHoverDisabled(event: any) {
    setHover(false);
    // console.log("Hovered cancelled");
  }
  useEffect(() => {
    const fetchInfo = async () => {
      let note: any = {};
      try {
        let data = await getPostBySlug(slug);
        note = data;
        // console.log(note);
        setTitle(note['title']);
        let temp_content= await markdownToHtml(note['content']); 

        const regex = /\[\[\s*([^[\]]*?)\s*\]\]/g;;
        temp_content = temp_content.replace(regex, '$1 ');


        setShortContent(temp_content);
      } catch (error) {
        console.log("Error: ", error);
      }

      return { note };
    };

    fetchInfo();
  }, []);

  return (
    <Container>
      <div>
        {hoverEnabled == true ? (
          <div
            style={{
              position: "fixed",
              width: "300px",
              height: "100px",
              backgroundColor: "white",
              overflow: "hidden",
              transform: "translate(0, 30px)",
              border: "1px solid black",
            }}
          >
            <strong>{title}</strong>
            <br />
            <div dangerouslySetInnerHTML={{ __html: shortcontent }} />
          </div>
        ) : (
          <div></div>
        )}
        <Link
          onMouseEnter={(event) => {
            setHoverEnabled(event);
          }}
          onMouseLeave={(event) => {
            setHoverDisabled(event);
          }}
          href={`/notes/${slug.replace(" ", "%20")}`}
        >
          <strong>{title}</strong>
        </Link>
      </div>
    </Container>
  );
}
