import Container from "../_components/Container/container";
import styles from "./Notes.module.css";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import NotesWidget from "../_components/NotesWidget/notesWidget";
import Script from "next/script";

export default async function Notes() {

  const posts = await getAllPosts();
  return (
    <div>
      <main>
        <Script src="/_previewPost.js" strategy="beforeInteractive" />
        <Container>
          <h2>Working Notes</h2>
          <br />
          <br />
          <p>
            Here's a compilation of books I've read. The ones marked with a star
            are must-reads, and those marked with two stars are re-reads. Check
            my Antilibrary for the bigger list :)
          </p>

          <div className={styles.search_container}>
            <input
              type="text"
              placeholder="Search Notes"
              className={styles.search_input}
            />
          </div>

          {posts &&
            posts.map((note: Post, index: number) => {
              return (
                <NotesWidget key={index} slug={note.slug} title={note.title} shortcontent={note.content} />
              );
            })}
        </Container>
      </main>
    </div>
  );
}
