import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import Mermaid from "./Mermaid";

interface BlogMarkdownProps {
  content: string;
}

const components: Components = {
  a: ({ node, ...props }) => (
    <a {...props} target={props.href?.startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer" />
  ),
  img: ({ node, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} loading="lazy" className="blog-img" />
  ),
  code({ node, className, children, ...rest }) {
    const match = /language-(\w+)/.exec(className || "");
    if (match?.[1] === "mermaid") {
      return <Mermaid chart={String(children)} />;
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre({ node, children, ...rest }) {
    const child = Array.isArray(children) ? children[0] : children;
    const isMermaid =
      child && typeof child === "object" && "type" in child && child.type === Mermaid;
    if (isMermaid) return <>{children}</>;
    return (
      <pre className="blog-pre" {...rest}>
        {children}
      </pre>
    );
  },
};

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
