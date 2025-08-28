import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/metadata";

export async function GET() {
  const posts = await getBlogPosts();

  const rssItems = posts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map((post) => {
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();
      const link = `${DATA.url}/blog/${post.slug}`;

      return `
        <item>
          <title><![CDATA[${post.metadata.title}]]></title>
          <description><![CDATA[${post.metadata.summary}]]></description>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${pubDate}</pubDate>
          <author>${DATA.contact.email} (${
        post.metadata.author || "Federico Fan"
      })</author>
          ${
            post.metadata.tags
              ? post.metadata.tags
                  .map((tag: string) => `<category>${tag}</category>`)
                  .join("")
              : ""
          }
        </item>
      `.trim();
    })
    .join("\n");

  const rss = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>uara Development Blog</title>
        <description>In-depth articles on Next.js, React, web performance, and modern development practices</description>
        <link>${DATA.url}/blog</link>
        <language>en-US</language>
        <managingEditor>${DATA.contact.email} (Federico Fan)</managingEditor>
        <webMaster>${DATA.contact.email} (Federico Fan)</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${
          DATA.url
        }/blog/rss.xml" rel="self" type="application/rss+xml"/>
        <image>
          <url>${DATA.url}/logo-uara.png</url>
          <title>uara Development Blog</title>
          <link>${DATA.url}/blog</link>
          <width>144</width>
          <height>144</height>
        </image>
        ${rssItems}
      </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
