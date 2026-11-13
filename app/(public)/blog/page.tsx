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
import { getServerLanguage } from "@/lib/server-language";
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
  const [blogs, { tr }] = await Promise.all([
    getBlogs(false),
    getServerLanguage(),
  ]);

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
          alt={tr("A sunlit dental journal and clinical desk", "धूप से रोशन डेंटल जर्नल और क्लिनिकल डेस्क")}
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
            {tr("The Smile Journal", "द स्माइल जर्नल")}
          </div>

          {/* Oversized Serif Headline */}
          <h1 className="mt-6 max-w-4xl font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[0.92] tracking-tight font-normal text-balance">
            {tr("Useful guidance.", "उपयोगी मार्गदर्शन।")}{" "}
            <em className="font-serif italic font-normal text-[#f4f3ef]">
              {tr("No jargon.", "सरल भाषा में।")}
            </em>
          </h1>

          {/* Editorial Subcopy */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed font-light font-sans">
            {tr(
              "Honest, practical notes from Dr. Nitu Rajpoot, BDS to help you make confident decisions about your dental health.",
              "आपके दंत स्वास्थ्य के बारे में सही और आत्मविश्वासपूर्ण निर्णय लेने में मदद के लिए डॉ. नीतू राजपूत, बीडीएस के व्यावहारिक लेख।"
            )}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0c2a2a] px-7 py-3.5 text-sm font-bold shadow-lg hover:bg-white/90 hover:-translate-y-0.5 transition-all"
            >
              {tr("Book a visit", "अपॉइंटमेंट बुक करें")} <ArrowRight className="size-4" />
            </Link>
            <a
              href="tel:+916261474753"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 text-white px-7 py-3.5 text-sm font-bold backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="size-4" /> {tr("Call the clinic", "क्लिनिक में कॉल करें")}
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
            {tr("Featured note", "प्रमुख लेख")}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0c2a2a] mt-2 tracking-tight">
            {tr("A bright smile starts long before the mirror.", "एक चमकती मुस्कान की शुरुआत आईने से बहुत पहले होती है।")}
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
                {tr("From Dr. Nitu", "डॉ. नीतू की कलम से")}
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
                  {tr("Read the note", "पूरा लेख पढ़ें")} <ArrowRight className="size-4 text-[#eb6a4c]" />
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <article className="grid overflow-hidden rounded-3xl bg-[#0c2a2a] text-white shadow-xl lg:grid-cols-2 border border-white/10">
            <div className="relative min-h-[22rem] overflow-hidden bg-[#164e4e]">
              <img
                src="https://images.unsplash.com/photo-1594824813589-322131920786?auto=format&fit=crop&w=1200&q=80"
                alt={tr("Dr. Nitu Rajpoot", "डॉ. नीतू राजपूत")}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                {tr("From Dr. Nitu", "डॉ. नीतू की कलम से")}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight font-normal">
                {tr(
                  "The five-minute routine your future smile will thank you for.",
                  "पांच मिनट की वह दिनचर्या जिसके लिए आपकी भविष्य की मुस्कान आपको धन्यवाद देगी।"
                )}
              </h3>
              <p className="text-sm leading-relaxed text-white/75 font-light">
                {tr(
                  "Good oral health is rarely about perfection. It is about a few small actions, repeated consistently—and knowing when to ask for help.",
                  "अच्छा दंत स्वास्थ्य केवल छोटी-छोटी आदतों को नियमित रूप से दोहराने और समय पर सही परामर्श लेने से जुड़ा है।"
                )}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#eb6a4c]">
                {tr("Articles publishing soon", "नए लेख जल्द प्रकाशित होंगे")} <ArrowRight className="size-4" />
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
                {tr("Latest stories", "नवीनतम लेख")}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a] mt-2">
                {tr("Fresh from the journal.", "जर्नल से नए लेख।")}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {tr("Clinical advice & patient guides", "चिकित्सीय सलाह और मरीज मार्गदर्शिका")}
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
                    <span>{tr("Read Full Article", "पूरा लेख पढ़ें")}</span>
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
                alt={tr("Dr. Nitu explaining a dental model to a patient", "मरीज को डेंटल मॉडल समझातीं डॉ. नीतू")}
                className="h-full w-full object-cover hover:scale-105 transition duration-700 ease-out"
              />
            </div>

            <div className="lg:col-span-6 space-y-6 max-w-xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
                  {tr("From the dentist", "डेंटिस्ट का संदेश")}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0c2a2a] mt-2 leading-tight">
                  {tr("Good questions make better care.", "सही सवाल बेहतर देखभाल बनाते हैं।")}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                {tr(
                  "When you understand what is happening in your mouth, it becomes easier to care for it every day. Dental procedures should never feel mysterious or intimidating.",
                  "जब आप अपने दांतों और मसूड़ों की स्थिति को अच्छी तरह समझते हैं, तो हर दिन उनकी देखभाल करना आसान हो जाता है। दंत उपचार कभी भी डरावना या उलझन भरा नहीं लगना चाहिए।"
                )}
              </p>

              <div className="border-t border-[#e7e5df] pt-6">
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed italic">
                  {tr(
                    "Ask at your next visit. We would rather spend an extra minute explaining than leave you wondering.",
                    "अपनी अगली विजिट पर बेझिझक पूछें। आपको किसी भी संशय में छोड़ने के बजाय हम समझाने में अतिरिक्त समय देना पसंद करेंगे।"
                  )}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/patient/book-appointment?type=IN_CLINIC"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-md"
                >
                  {tr("Ask Dr. Nitu", "डॉ. नीतू से पूछें")} <ArrowRight className="size-3.5" />
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
              {tr("Everyday inspiration", "हर दिन की प्रेरणा")}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a]">
              {tr("Small moments, healthier smiles.", "छोटे पल, स्वस्थ मुस्कान।")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {tr(
                "Caring for your teeth is part of everyday living—not just a twice-a-year appointment.",
                "अपने दांतों की देखभाल करना रोज़मर्रा के जीवन का हिस्सा है—केवल साल में दो बार का अपॉइंटमेंट नहीं।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={family.src}
                  alt={tr("A father and son sharing a smile at the clinic", "क्लिनिक में मुस्कुराते हुए पिता और पुत्र")}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                {tr("Make visits feel familiar", "क्लिनिक विजिट को सहज बनाएं")}
              </figcaption>
            </figure>

            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={familybrushing.src}
                  alt={tr("Mother and daughter brushing together", "माँ और बेटी एक साथ ब्रश करते हुए")}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                {tr("Make routines feel fun", "रोज़मर्रा की आदतों को मजेदार बनाएं")}
              </figcaption>
            </figure>

            <figure className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={smile.src}
                  alt={tr("Dentist and patient sharing a happy smile", "डेंटिस्ट और मरीज की खुशहाल मुस्कान")}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>
              <figcaption className="font-serif text-2xl text-[#0c2a2a] font-normal">
                {tr("Celebrate the little wins", "हर छोटी खुशी का जश्न मनाएं")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6. ASK DR. Nitu / HAVE A QUESTION SECTION */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#e7e5df]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#eb6a4c]">
            {tr("Have a question?", "कोई सवाल है?")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2a2a] leading-tight">
            {tr("Your question could help someone else, too.", "आपका सवाल किसी और की भी मदद कर सकता है।")}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed font-light">
            {tr(
              "Tell Dr. Nitu what you would like explained next. The most common patient questions become future journal notes and video discussions.",
              "डॉ. नीतू को बताएं कि आप अगला लेख किस विषय पर पढ़ना चाहेंगे। मरीजों के सबसे सामान्य सवाल भविष्य के लेखों और वीडियो चर्चाओं का हिस्सा बनते हैं।"
            )}
          </p>
          <div className="pt-4">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="inline-flex items-center gap-2 rounded-full bg-[#0c2a2a] px-8 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-md"
            >
              {tr("Send your question", "अपना सवाल भेजें")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SIGNATURE CORAL BOOKING BAND */}
      <section className="bg-[#eb6a4c] text-white px-4 sm:px-6 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              {tr("A different kind of dental visit", "एक अलग और सुखद डेंटल अनुभव")}
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              {tr("Thoughtful care for your whole family.", "आपके पूरे परिवार के लिए संवेदनशील देखभाल।")}
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              {tr(
                "Same-day relief, preventive care, and clear transparent pricing in Pune.",
                "उसी दिन राहत, निवारक देखभाल और पूरी तरह से पारदर्शी शुल्क।"
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center shrink-0">
            <Link
              href="/patient/book-appointment?type=IN_CLINIC"
              className="rounded-full bg-[#0c2a2a] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#164e4e] transition-colors shadow-lg"
            >
              {tr("Book In-Clinic Visit", "क्लिनिक अपॉइंटमेंट बुक करें")}
            </Link>
            <Link
              href="/patient/book-appointment?type=VIDEO"
              className="rounded-full bg-white text-[#0c2a2a] px-7 py-3.5 text-xs font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              {tr("Book Video Consult", "वीडियो परामर्श बुक करें")}
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