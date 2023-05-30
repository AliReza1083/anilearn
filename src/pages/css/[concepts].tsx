import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { folderPathFor, mdxStyling } from "utils/mdxFiles";
import { Components } from "@components/Tech/MDXComponents";
import Container from "@layouts/Container";

type Props = {
  data: {
    order: number;
    tech: string;
    title: string;
  };
  mdxSource: any;
};

// Icons
import { AiOutlineHome } from "react-icons/ai";
import { HiArrowLongRight } from "react-icons/hi2";
import ExtraInformation from "@components/ExtraInformation";
import MetaTag from "@layouts/MetaTag";

export default function Concepts({ data, mdxSource }: Props) {
  const router = useRouter();

  const { concepts }: any = router.query;

  return (
    <>
      <MetaTag title={data.title} description="" image={null} />
      <Container className="pt-12 pb-20">
        {/* <div className="flex items-center gap-1 mb-4">
        <Link
          href={"/"}
          className="px-2 py-1 text-white rounded-md bg-white/30"
        >
          <AiOutlineHome />
        </Link>
        <HiArrowLongRight />
        <div className="px-2">CSS</div>
        <HiArrowLongRight />
        <div className="px-2 text-white capitalize ">
          {concepts!.replaceAll("-", " ")}
        </div>
      </div> */}
        <div id="mdx" className="pb-8">
          <MDXRemote {...mdxSource} components={Components} />
        </div>
        {/* Contact */}
        <ExtraInformation />
      </Container>
    </>
  );
}

export const getStaticPaths = () => {
  const folderPath = path.join(process.cwd(), "src/docs/css");
  const fileNames = fs.readdirSync(folderPath);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        concepts: fileName.replace(".mdx", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { concepts } = params;
  const folderPath: any = folderPathFor("css", concepts);

  const content = fs.readFileSync(folderPath);
  const { data, content: techContent } = matter(content);
  const mdxSource = await mdxStyling(techContent);

  return {
    props: {
      data,
      mdxSource,
    },
  };
};
