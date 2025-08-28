import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/metadata";

export const metadata = {
  title: "Blog — Web Development Insights & Tutorials | uara",
  description:
    "In-depth articles on Next.js, React, web performance, and modern development practices. Learn from real-world projects and improve your skills.",
  keywords: [
    "web development blog",
    "Next.js tutorials",
    "React development",
    "web performance optimization",
    "frontend development",
    "JavaScript tutorials",
    "programming blog",
  ],
  openGraph: {
    title: "Blog — Web Development Insights & Tutorials | uara",
    description:
      "In-depth articles on Next.js, React, web performance, and modern development practices.",
    url: `${DATA.url}/blog`,
    siteName: DATA.name,
    images: [
      {
        url: `${DATA.url}/og/blog-og.png`,
        width: 1200,
        height: 630,
        alt: "uara Blog - Web Development Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Web Development Insights & Tutorials | uara",
    description:
      "In-depth articles on Next.js, React, web performance, and modern development practices.",
    images: [`${DATA.url}/og/blog-og.png`],
    creator: "@FedericoFan",
  },
  alternates: {
    canonical: `${DATA.url}/blog`,
    types: {
      "application/rss+xml": `${DATA.url}/blog/rss.xml`,
    },
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "uara Development Blog",
    description:
      "In-depth articles on Next.js, React, web performance, and modern development practices",
    url: `${DATA.url}/blog`,
    author: {
      "@type": "Person",
      name: "Federico Fan",
      url: DATA.url,
      sameAs: [
        DATA.contact.social.Twitter.url,
        DATA.contact.social.LinkedIn.url,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "uara",
      url: DATA.url,
      logo: {
        "@type": "ImageObject",
        url: `${DATA.url}/logo-uara.svg`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.metadata.title,
      description: post.metadata.summary,
      url: `${DATA.url}/blog/${post.slug}`,
      datePublished: post.metadata.publishedAt,
      author: {
        "@type": "Person",
        name: post.metadata.author || "Federico Fan",
      },
      image: post.metadata.image
        ? `${DATA.url}${post.metadata.image}`
        : `${DATA.url}/og/blog-og.png`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="max-w-[800px] mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-medium text-2xl tracking-tighter">
            Web Development Blog
          </h1>
          <p className="text-muted-foreground">
            In-depth articles on Next.js, React, web performance, and modern
            development practices. Learn from real-world projects and improve
            your development skills.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post, index) => (
            <article className="group" key={index}>
              <Link href={`/blog/${post.slug}`} className="font-mono">
                <div className="rounded-lg border bg-black/80 overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-red-500" />
                      <div className="size-3 rounded-full bg-yellow-500" />
                      <div className="size-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-zinc-400">blog.post</div>
                    <div className="w-16" /> {/* Spacer to center filename */}
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 group-hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-start gap-2 text-green-500">
                      <span>$</span>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="text-blue-400">cat</span>{" "}
                          <span className="text-zinc-200">
                            {post.metadata.title}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                          {post.metadata.summary}
                        </p>

                        {/* Tags */}
                        {post.metadata.tags &&
                          post.metadata.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.metadata.tags
                                .slice(0, 3)
                                .map((tag: string) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs px-2 py-0 h-5 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                          )}

                        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                          <span>
                            Published:{" "}
                            <time dateTime={post.metadata.publishedAt}>
                              {new Date(
                                post.metadata.publishedAt
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </span>
                          {post.metadata.readingTime && (
                            <span>{post.metadata.readingTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
