import { getBlogPosts, getPost, estimateReadingTime } from "@/data/blog";
import { DATA } from "@/data/metadata";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MarkdownParser } from "@/components/markdown-parser";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  try {
    const { slug } = await params;
    const post = await getPost(slug);
    const {
      title,
      publishedAt: publishedTime,
      summary: description,
      image,
      tags,
      author,
    } = post.metadata;

    const ogImage = image
      ? `${DATA.url}${image}`
      : `${DATA.url}/og/blog-og.png`;
    const readingTime = estimateReadingTime(post.source);

    return {
      title: `${title} | uara Blog`,
      description,
      keywords: tags || [],
      authors: [{ name: author || "Federico Fan" }],
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime,
        modifiedTime: post.metadata.lastModified || publishedTime,
        url: `${DATA.url}/blog/${post.slug}`,
        siteName: DATA.name,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        authors: [author || "Federico Fan"],
        tags: tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
        creator: "@FedericoFan",
      },
      alternates: {
        canonical: `${DATA.url}/blog/${slug}`,
      },
      other: {
        "article:reading_time": readingTime,
      },
    };
  } catch {
    return undefined;
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
      notFound();
    }

    const readingTime = estimateReadingTime(post.source);
    const relatedPosts = await getBlogPosts();
    const otherPosts = relatedPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.metadata.title,
      description: post.metadata.summary,
      image: post.metadata.image
        ? `${DATA.url}${post.metadata.image}`
        : `${DATA.url}/og/blog-og.png`,
      url: `${DATA.url}/blog/${post.slug}`,
      datePublished: post.metadata.publishedAt,
      dateModified: post.metadata.lastModified || post.metadata.publishedAt,
      author: {
        "@type": "Person",
        name: post.metadata.author || "Federico Fan",
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${DATA.url}/blog/${slug}`,
      },
      keywords: post.metadata.tags?.join(", ") || "",
      wordCount: post.source.split(/\s+/).length,
    };

    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-12">
            <div className="flex items-start gap-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Link
                  href="/"
                  className="hover:text-teal-300 transition-colors"
                >
                  home
                </Link>
                <span>/</span>
                <Link
                  href="/blog"
                  className="hover:text-teal-300 transition-colors"
                >
                  blog
                </Link>
                <span>/</span>
                <span className="text-foreground">
                  {post.metadata.title.toLowerCase()}
                </span>
              </div>
            </div>
          </nav>

          <article className="space-y-12">
            {/* Article Header */}
            <header className="text-center space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                {post.metadata.title.toLowerCase()}
                <span className="text-teal-300">.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {post.metadata.summary}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <time dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
                <span>•</span>
                <span>{readingTime}</span>
                {post.metadata.author && (
                  <>
                    <span>•</span>
                    <span>{post.metadata.author.toLowerCase()}</span>
                  </>
                )}
              </div>

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.metadata.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2 py-0 h-4 bg-muted text-muted-foreground"
                    >
                      {tag.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <MarkdownParser
              content={post.source}
              className="mx-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            />
          </article>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <section className="space-y-6 mt-16 pt-12 border-t">
              <h3 className="text-teal-300">more articles:</h3>
              <div className="space-y-4">
                {otherPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <span className="text-green-400 font-mono text-sm mt-1">
                        ◇
                      </span>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-teal-300 transition-colors line-clamp-2">
                          {relatedPost.metadata.title.toLowerCase()}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {relatedPost.metadata.summary}
                        </p>
                        <time
                          dateTime={relatedPost.metadata.publishedAt}
                          className="text-xs text-muted-foreground block"
                        >
                          {formatDate(relatedPost.metadata.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
