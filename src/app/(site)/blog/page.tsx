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
      <div className="flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto">
        {/* Blog Header */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              how to build the perfect website
              <span className="text-teal-300">.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              in-depth articles on next.js, react, web performance, and modern
              development practices. learn from real-world projects.
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="w-full space-y-12">
          <div className="space-y-6">
            <h3 className="text-teal-300">latest posts:</h3>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <article key={index} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <span className="text-green-400 font-mono text-sm mt-1">
                        ◇
                      </span>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h2 className="text-sm font-medium text-foreground group-hover:text-teal-300 transition-colors">
                            {post.metadata.title}
                          </h2>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {post.metadata.summary}
                          </p>
                        </div>

                        {/* Tags */}
                        {post.metadata.tags &&
                          post.metadata.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.metadata.tags
                                .slice(0, 3)
                                .map((tag: string) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs px-2 py-0 h-4 bg-muted text-muted-foreground"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                          )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <time dateTime={post.metadata.publishedAt}>
                            {new Date(
                              post.metadata.publishedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                          {post.metadata.readingTime && (
                            <span>→ {post.metadata.readingTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
