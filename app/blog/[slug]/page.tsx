import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { getMDXComponents } from "@/app/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as NodeJS.ErrnoException).code === "string"
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = await fs.readdir(postsDirectory);

  const mdxFiles = filenames.filter((file) => path.extname(file) === ".mdx");

  return mdxFiles.map((filename) => ({
    slug: path.basename(filename, ".mdx"),
  }));
}

async function getPost(slug: string): Promise<string | null> {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const postContent = await getPost(slug);

  if (!postContent) {
    notFound();
  }

  const { content } = matter(postContent);

  return (
    <div className="prose mx-auto py-8">
      <MDXRemote source={content} components={getMDXComponents()} />
    </div>
  );
}
