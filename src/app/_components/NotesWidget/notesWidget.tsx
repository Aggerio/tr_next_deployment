"use client";
import Link from "next/link";
import Container from "../Container/container";
import styles from "./notesWidgets.module.css";
import { useState } from "react";
import PreviewMdFile from "../PreviewMdFile/previewMdFile";

export default function NotesWidget({
  title,
  shortcontent,
  slug
}: {
  title: string;
  shortcontent: string;
  slug: string
}) {
  //TODO: fix the Link
  return (
    <Container>
      <div className={styles.box}>
        {/* <PreviewMdFile title = {title} shortcontent={shortcontent} slug={slug} /> */}
        <PreviewMdFile slug={slug} />

      </div>
    </Container>
  );
}
