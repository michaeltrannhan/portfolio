import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { useMDXComponents } from "@/app/mdx-components";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = await fs.readdir(postsDirectory);

  const mdxFiles = filenames.filter((file) => path.extname(file) === ".mdx");

  return mdxFiles.map((filename) => ({
    slug: path.basename(filename, ".mdx"),
  }));
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return fileContents;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return notFound(); // Next.js built-in 404
    } else {
      throw error; // Re-throw other errors
    }
  }
}

export default async function Page({ params }: Props) {
  const postContent = await getPost(params.slug);

  if (!postContent) {
    return notFound();
  }

  return (
    <div className="prose mx-auto py-8">
      <Mdx components={useMDXComponents({})}>{postContent}</Mdx>
    </div>
  );
}
