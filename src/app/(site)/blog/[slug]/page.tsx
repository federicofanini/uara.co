import { getBlogPosts, getPost, estimateReadingTime } from "@/data/blog";
import { DATA } from "@/data/metadata";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

        <div className="max-w-[800px] mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium truncate">
                {post.metadata.title}
              </li>
            </ol>
          </nav>

          <article>
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="title font-medium text-3xl md:text-4xl tracking-tighter mb-4">
                {post.metadata.title}
              </h1>

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.metadata.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <time dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
                <span>•</span>
                <span>{readingTime}</span>
                {post.metadata.author && (
                  <>
                    <span>•</span>
                    <span>By {post.metadata.author}</span>
                  </>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.metadata.summary}
              </p>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:tracking-tight prose-headings:font-medium
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:leading-7 prose-li:leading-7
                prose-pre:bg-zinc-900 prose-pre:border
                prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
                prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-code:before:content-none prose-code:after:content-none
                prose-img:rounded-lg prose-img:border
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.source }}
            />
          </article>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t">
              <h2 className="text-xl font-medium tracking-tight mb-6">
                More Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-4 rounded-lg border hover:border-muted-foreground/50 transition-colors"
                  >
                    <h3 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {relatedPost.metadata.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {relatedPost.metadata.summary}
                    </p>
                    <time
                      dateTime={relatedPost.metadata.publishedAt}
                      className="text-xs text-muted-foreground mt-2 block"
                    >
                      {formatDate(relatedPost.metadata.publishedAt)}
                    </time>
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
