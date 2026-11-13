import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  User,
  Phone,
  Calendar,
} from "lucide-react";
import { getBlogs } from "@/app/actions/clinic-cms";
import explainedcare from "@/assets/images/explainedcare.jpg";
import family from "@/assets/images/familyclinic.jpg";
import familybrushing from "@/assets/images/familybrushing.jpg";
import smile from "@/assets/images/smilemoment.jpg";
import bloghero from "@/assets/images/bloghero.jpg";

// Helper to strip raw Markdown symbols (###, **, -) so previews look clean
function cleanMarkdownText(text?: string | null): string {
  if (!text) return "";
  return text
    .replace(/^#{1,6}\s+/gm, "") // remove heading hashes (### )
    .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold stars (**text**)
    .replace(/\*(.*?)\*/g, "$1") // remove italic stars (*text*)
    .replace(/^[-*]\s+/gm, "• ") // turn markdown dashes into clean bullets
    .replace(/\n+/g, " ") // collapse multiple newlines into clean spaces for excerpts
    .trim();
}

async function BlogDirectoryContent() {
  const blogs = await getBlogs(false);

  // First blog acts as featured note; remaining blogs populate the journal grid
  const featuredBlog = blogs[0];
  const gridBlogs = blogs.slice(1);

  return (
    <main className="w-full bg-[#fbfbf9] text-[#1c1917] overflow-x-hidden">
      {/* 1. EXACT LOVABLE PAGE HERO - Photographic Background with Dual Gradients & Coral Bar */}
      <section className="relative min-h-[82vh] sm:min-h-[88vh] lg:min-h-[820px] w-full overflow-hidden bg-[#0c2a2a] -mt-20 flex flex-col justify-center">
        {/* Background Photo */}
        <img
          src={bloghero.src}
          alt="A sunlit dental journal and clinical desk"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Cinematic Dual Gradient Shading (Left-to-Right + Bottom-to-Top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-30% to-transparent to-65%" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0c2a2a] via-[#0c2a2a]/40 to-transparent" /> */}

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 flex flex-col items-start justify-center">
          {/* Eyebrow Frosted Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0c2a2a]/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eb6a4c]" />
            The Smile Journal
          </div>

          {/* Oversized Serif Headline */}
          <h1 className="mt-6 max-w-4xl font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[0.92] tracking-tight font-normal text-balance">
            Useful guidance.{" "}
            <em className="font-serif italic font-normal text-[#f4f3ef]">
              No jargon.
            </em>
          </h1>

          {/* Editorial Subcopy */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed font-light font-sans">
            Honest, practical notes from Dr. Nitu Rajpoot, BDS to help you make confident decisions about your dental health.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0c2a2a] px-7 py-3.5 text-sm font-bold shadow-lg hover:bg-white/90 hover:-translate-y-0.5 transition-all"
            >
              Book a visit <ArrowRight className="size-4" />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 text-white px-7 py-3.5 text-sm font-bold backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="size-4" /> Call the clinic
            </a>
          </div>
        </div>

        {/* Bottom-right Signature Coral Bar */}
        <div
          className="absolute right-0 bottom-0 z-20 w-44 sm:w-64 h-2 bg-[#eb6a4c]"
          aria-hidden="true"
        />
      </section>

      {/* 2. FEATURED NOTE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
            Featured note
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0c2a2a] mt-2 tracking-tight">
            A bright smile starts long before the mirror.
          </h2>
        </div>

        {featuredBlog ? (
          <article className="grid overflow-hidden rounded-3xl bg-[#0c2a2a] text-white shadow-xl hover:shadow-2xl transition duration-300 lg:grid-cols-2 border border-white/10">
            <div className="relative min-h-[20rem] sm:min-h-[26rem] overflow-hidden bg-[#164e4e]/40">
              <img
                src={
                  featuredBlog.coverImage ||
                  "https://images.unsplash.com/photo-1594824813589-322131920786?auto=format&fit=crop&w=1200&q=80"
                }
                alt={featuredBlog.title}
                className="h-full w-full object-cover object-top hover:scale-105 transition duration-700 ease-out"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0c2a2a]/80 backdrop-blur-md text-[#eb6a4c] text-xs font-bold border border-white/10">
                {featuredBlog.category}
              </span>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                From Dr. Nitu
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight font-normal">
                {cleanMarkdownText(featuredBlog.title)}
              </h3>
              <p className="text-sm leading-relaxed text-white/75 font-light">
                {cleanMarkdownText(featuredBlog.excerpt || featuredBlog.content)}
              </p>
              <div className="flex items-center gap-4 text-xs text-white/60 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#eb6a4c]" />
                  {featuredBlog.readTime}
                </span>
                <span>•</span>
                <span>{featuredBlog.authorName}</span>
              </div>
              <div className="pt-3">
                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#eb6a4c] transition-colors"
                >
                  Read the note <ArrowRight className="size-4 text-[#eb6a4c]" />
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <article className="grid overflow-hidden rounded-3xl bg-[#0c2a2a] text-white shadow-xl lg:grid-cols-2 border border-white/10">
            <div className="relative min-h-[22rem] overflow-hidden bg-[#164e4e]">
              <img
                src="https://images.unsplash.com/photo-1594824813589-322131920786?auto=format&fit=crop&w=1200&q=80"
                alt="Dr. Nitu Rajpoot"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                From Dr. Nitu
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight font-normal">
                The five-minute routine your future smile will thank you for.
              </h3>
              <p className="text-sm leading-relaxed text-white/75 font-light">
                Good oral health is rarely about perfection. It is about a few small actions, repeated consistently—and knowing when to ask for help.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#eb6a4c]">
                Articles publishing soon <ArrowRight className="size-4" />
              </span>
            </div>
          </article>
        )}
      </section>

      {/* 3. LATEST STORIES SECTION */}
      <section className="bg-[#f4f3ef] border-y border-[#e7e5df] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                Latest stories
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a] mt-2">
                Fresh from the journal.
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Clinical advice & patient guides
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(gridBlogs.length > 0 ? gridBlogs : blogs).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-3xl border border-[#e7e5df] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0c2a2a]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 bg-stone-100 relative overflow-hidden">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-400">
                        <BookOpen className="size-10" />
                      </div>
                    )}
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#0c2a2a] text-[11px] font-bold shadow-sm border border-stone-100">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#eb6a4c]">
                      {blog.category}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0c2a2a] group-hover:text-[#eb6a4c] transition-colors leading-snug line-clamp-2">
                      {cleanMarkdownText(blog.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed font-light">
                      {cleanMarkdownText(blog.excerpt || blog.content)}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 border-t border-[#f0eee9] pt-4">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="size-3.5 text-[#eb6a4c]" />
                      {blog.readTime}
                    </span>
                    <span className="font-medium text-stone-500 truncate max-w-[120px]">
                      {blog.authorName}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c2a2a] group-hover:text-[#eb6a4c] transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform text-[#eb6a4c]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHOTO NARRATIVE SECTION ("From the dentist") */}
      <section className="bg-white py-16 sm:py-24 border-b border-[#e7e5df]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
              <img
                src={explainedcare.src}
                alt="Dr. Nitu explaining a dental model to a patient"
                className="h-full w-full object-cover hover:scale-105 transition duration-700 ease-out"
              />
            </div>

            <div className="lg:col-span-6 space-y-6 max-w-xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                  From the dentist
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0c2a2a] mt-2 leading-tight">
                  Good questions make better care.
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                When you understand what is happening in your mouth, it becomes easier to care for it every day. Dental procedures should never feel mysterious or intimidating.
              </p>

              <div className="border-t border-[#e7e5df] pt-6">
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed italic">
                  Ask at your next visit. We would rather spend an extra minute explaining than leave you wondering.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/patient/book-appointment?type=IN_CLINIC"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-md"
                >
                  Ask Dr. Nitu <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHOTO MOMENTS SHOWCASE ("Everyday inspiration") */}
      <section className="bg-[#f4f3ef] py-16 sm:py-24 border-b border-[#e7e5df]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
              Everyday inspiration
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a]">
              Small moments, healthier smiles.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Caring for your teeth is part of everyday living—not just a twice-a-year appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={family.src}
                  alt="A father and son sharing a smile at the clinic"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                Make visits feel familiar
              </figcaption>
            </figure>

            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={familybrushing.src}
                  alt="Mother and daughter brushing together"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                Make routines feel fun
              </figcaption>
            </figure>

            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={smile.src}
                  alt="Dentist and patient sharing a happy smile"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                Celebrate the little wins
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6. ASK DR. Nitu / HAVE A QUESTION SECTION */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#e7e5df]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
            Have a question?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a] leading-tight">
            Your question could help someone else, too.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed font-light">
            Tell Dr. Nitu what you would like explained next. The most common patient questions become future journal notes and video discussions.
          </p>
          <div className="pt-4">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-8 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-md"
            >
              Send your question <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SIGNATURE CORAL BOOKING BAND */}
      <section className="bg-[#eb6a4c] text-white px-4 sm:px-6 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              A different kind of dental visit
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              Thoughtful care for your whole family.
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Same-day relief, preventive care, and clear transparent pricing in Pune.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center shrink-0">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="rounded-full bg-[#0c2a2a] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-lg"
            >
              Book In-Clinic Visit
            </Link>
            <Link
              href="/patient/book-appointment?type=VIDEO"
              className="rounded-full bg-white text-[#0c2a2a] px-7 py-3.5 text-xs font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              Book Video Consult
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-[#fbfbf9] min-h-screen">
          <div className="bg-[#0c2a2a] min-h-[82vh] animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
            <div className="h-80 rounded-3xl bg-stone-200 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-3xl bg-stone-100 border border-stone-200 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <BlogDirectoryContent />
    </Suspense>
  );
}