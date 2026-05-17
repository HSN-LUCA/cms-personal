import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Badge } from "@/components/ui/badge";
import profileData from "@/content/profile.json";
import type { Profile } from "@/types/index";

const profile = profileData as Profile;

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable date,
 * e.g. "March 15, 2024".
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = useBlogPosts();

  const post = posts.find((p) => p.slug === slug);

  // Redirect to home if the slug doesn't match any post
  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>
          {post.title} | {profile.name}
        </title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            ← Back to Home
          </Link>

          {/* Post header */}
          <article>
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              <time
                dateTime={post.date}
                className="text-sm text-muted-foreground"
              >
                {formatDate(post.date)}
              </time>

              {/* Cover image */}
              <div className="mt-6 rounded-xl overflow-hidden aspect-video bg-muted">
                <img
                  src={post.coverImage}
                  alt={`Cover image for "${post.title}"`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Markdown body */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>

          {/* Footer back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
