"use client";
import Container from "../_components/Container/container";
import Header from "../_components/Header/header";
import NotesWidget from "../_components/NotesWidget/notesWidget";
import styles from "./Notes.module.css";
import { useState, useEffect } from "react";
import getAllPosts from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Post } from "@/interfaces/post";

type notesList = {
  Post: Post[];
};

export default function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notesList, setNotesList] = useState<notesList[] | null>();
  const [filteredNotes, setFilteredNotes] = useState<notesList[] | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await getAllPosts();
        const modifiedNotes = await Promise.all(
          data.map(async (note: any) => {
            note.content = await markdownToHtml(note.content);
            return note;
          })
        );
        setNotesList(modifiedNotes);
        setFilteredNotes(modifiedNotes); // Initially set filtered notes to all notes
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchAllPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (notesList) {
      if (searchTerm.trim() === "") {
        setFilteredNotes(notesList); // If search term is empty, display all notes
      } else {
        const filtered = notesList?.filter((note: any) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotes(filtered);
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
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
              onChange={handleChange}
            />
          </div>
          {filteredNotes &&
            filteredNotes.map((note: any, index: any) => (
              <NotesWidget
                key={index}
                title={note.title}
                shortcontent={note.content}
                slug={note.slug}
              />
            ))}
        </Container>
      </main>
    </div>
  );
}

