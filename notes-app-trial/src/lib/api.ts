"use server";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Post } from "@/interfaces/post";
import markdownToHtml from "./markdownToHtml";

const postsDirectory = join(process.cwd(), "_notes");

function allMdFiles(): string[] {
  const mdFiles: string[] = [];

  function search(directory: string) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = join(directory, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        search(filePath); // Recursively search subdirectories
      } else if (filePath.endsWith(".md")) {
        mdFiles.push(filePath);
      }
    });
  }

  search(postsDirectory);
  return mdFiles;
}

export async function getPostSlugs() {
  const allMd = allMdFiles();
  const slugs: string[] = [];
  allMd.forEach((file) => {
    const parts = file.split("/");
    file = parts[parts.length - 1];
    file = file.replaceAll(" ", "%20");
    slugs.push(file);
  });
  // console.log("All slugs: ", slugs);

  return slugs;
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "").replaceAll("%20", " ");
  //console.log("realSlug: ", realSlug);
  //const mdPath = join(postsDirectory, `${realSlug}.md`);

  const allMds = allMdFiles();
  //console.log("Found md files: ", allMds);

  const mdPath = allMds.find((element) => element.endsWith(realSlug + ".md"));
  // console.log(mdPath);
  if (mdPath != null) {
    const fileContents = fs.readFileSync(mdPath, "utf8");

    // console.log("fileContents: ", fileContents);
    const { data, content } = matter(fileContents);

    //console.log("data: ", data);

    return { ...data, slug: realSlug, content } as Post;
  }
}

export async function getPostContentBySlug(slug: string) {
  const post = await getPostBySlug(slug);
  // return `<p>It's easy to make notes.And there are many easier ways to make notes — like Copy-pasting or Quoting.What we miss while doing that is the intention of note-taking.</p><p>Use note-taking to develop ideas, arguments, and discussions, not to<em>collect</em>ideas.</p><hr><h3>Source</h3><ul><li><strong>BOOK- How to Take Smart Notes</strong></li><li><a href="https://notes.andymatuschak.org/z4SDCZQeRo4xFEQ8H4qrSqd68ucpgE6LU155C">Evergreen Notes by Andy Matuschak</a></li></ul>`;

  if (post) {
    let content = post.content;
    content = content.split(".")[0];
    let html = await markdownToHtml(content);
    const regex = /\[\[\s*([^[\]]*?)\s*\]\]/g;
    html = html
      .replace(regex, `<strong>$1</strong>`)
      .replace(/\>[\r\n ]+\</g, "><")
      .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
      .trim();
    console.log("returning html: ", html);
    return html;
  } else {
    return "";
  }
}
export default async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts: any = [];
  for (let i = 0; i < slugs.length; ++i) {
    posts.push(await getPostBySlug(slugs[i]));
  }
  return posts;
}
