import { Link } from "react-router-dom";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { useBlogPosts } from "@/hooks/useBlogPosts";

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

export default function BlogSection() {
  const posts = useBlogPosts();

  return (
    <SectionWrapper id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Blog
        </h2>

        {/* Single-column on mobile, 2-column grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Read blog post: ${post.title}`}
            >
              {/* Cover image */}
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={post.coverImage}
                  alt={`Cover image for "${post.title}"`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <time
                  dateTime={post.date}
                  className="text-xs text-muted-foreground"
                >
                  {formatDate(post.date)}
                </time>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <span className="text-sm font-medium text-primary mt-1">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
