"use server";

import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function createSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);
  return `${base || "dental-article"}-${Date.now().toString().slice(-4)}`;
}

// Automatically ensures the `blogs` table exists in Neon DB with all required columns
async function ensureBlogsTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL DEFAULT 'Clinical Dentistry',
      read_time TEXT NOT NULL DEFAULT '4 Min Read',
      cover_image TEXT,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL,
      author_name TEXT NOT NULL DEFAULT 'Dr. Nitu Rajpoot, BDS',
      is_published BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Normalizes snake_case rows from PostgreSQL into camelCase for your frontend components
function mapBlogRow(row: any) {
  if (!row) return null;
  return {
    id: Number(row.id),
    title: row.title || "",
    slug: row.slug || "",
    category: row.category || "Clinical Dentistry",
    readTime: row.read_time || row.readTime || "4 Min Read",
    coverImage:
      row.cover_image ||
      row.coverImage ||
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    excerpt: row.excerpt || "",
    content: row.content || "",
    authorName: row.author_name || row.authorName || "Dr. Nitu Rajpoot, BDS",
    isPublished:
      row.is_published !== undefined
        ? Boolean(row.is_published)
        : Boolean(row.isPublished ?? true),
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

export async function getBlogs(includeUnpublished = false) {
  try {
    await ensureBlogsTable();

    const result: any = includeUnpublished
      ? await db.execute(sql`SELECT * FROM blogs ORDER BY created_at DESC, id DESC`)
      : await db.execute(
          sql`SELECT * FROM blogs WHERE is_published = true ORDER BY created_at DESC, id DESC`
        );

    const rows = Array.isArray(result) ? result : result?.rows || [];
    return rows.map(mapBlogRow);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await ensureBlogsTable();

    const result: any = await db.execute(
      sql`SELECT * FROM blogs WHERE slug = ${slug} LIMIT 1`
    );

    const rows = Array.isArray(result) ? result : result?.rows || [];
    return rows.length > 0 ? mapBlogRow(rows[0]) : null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

export async function saveBlogPost(data: {
  id?: number;
  title: string;
  category?: string;
  readTime?: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  authorName?: string;
  isPublished?: boolean;
}) {
  try {
    await ensureBlogsTable();

    const cleanTitle = data.title.trim();
    const cleanCategory = data.category?.trim() || "Endodontics & RCT";
    const cleanReadTime = data.readTime?.trim() || "4 Min Read";
    const cleanAuthor = data.authorName?.trim() || "Dr. Nitu Rajpoot, BDS";
    const cleanCover =
      data.coverImage?.trim() ||
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80";
    const cleanExcerpt =
      data.excerpt?.trim() ||
      data.content.replace(/<[^>]*>/g, " ").slice(0, 150).trim();
    const published = data.isPublished ?? true;

    if (data.id) {
      const result: any = await db.execute(sql`
        UPDATE blogs
        SET
          title = ${cleanTitle},
          category = ${cleanCategory},
          read_time = ${cleanReadTime},
          cover_image = ${cleanCover},
          excerpt = ${cleanExcerpt},
          content = ${data.content},
          is_published = ${published}
        WHERE id = ${Number(data.id)}
        RETURNING *;
      `);

      const rows = Array.isArray(result) ? result : result?.rows || [];
      const updatedPost = rows.length > 0 ? mapBlogRow(rows[0]) : null;

      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/blogs");
      revalidatePath("/doctor/dashboard");

      return { success: true, post: updatedPost };
    } else {
      const slug = createSlug(cleanTitle);

      const result: any = await db.execute(sql`
        INSERT INTO blogs (
          title,
          slug,
          category,
          read_time,
          cover_image,
          excerpt,
          content,
          author_name,
          is_published
        )
        VALUES (
          ${cleanTitle},
          ${slug},
          ${cleanCategory},
          ${cleanReadTime},
          ${cleanCover},
          ${cleanExcerpt},
          ${data.content},
          ${cleanAuthor},
          ${published}
        )
        RETURNING *;
      `);

      const rows = Array.isArray(result) ? result : result?.rows || [];
      const insertedPost = rows.length > 0 ? mapBlogRow(rows[0]) : null;

      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/blogs");
      revalidatePath("/doctor/dashboard");

      return { success: true, post: insertedPost };
    }
  } catch (error: any) {
    console.error("Failed to save blog to Neon DB:", error);
    return {
      success: false,
      error: error?.message || "Database error while saving blog post.",
    };
  }
}

export async function deleteBlogPost(id: number) {
  try {
    await ensureBlogsTable();
    await db.execute(sql`DELETE FROM blogs WHERE id = ${Number(id)}`);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blogs");
    revalidatePath("/doctor/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blog:", error);
    return { success: false, error: error?.message };
  }
}