import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc } from 'drizzle-orm';
import { links, type NewLink } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getLinksByUserId(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLink(data: Omit<NewLink, 'id' | 'createdAt'>) {
  const [newLink] = await db
    .insert(links)
    .values(data)
    .returning();
  
  return newLink;
}

export async function checkShortCodeExists(shortCode: string) {
  const [existing] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return !!existing;
}

export async function updateLink(
  linkId: number,
  userId: string,
  data: { originalUrl?: string; shortCode?: string; title?: string | null }
) {
  const [updatedLink] = await db
    .update(links)
    .set(data)
    .where(eq(links.id, linkId))
    .returning();
  
  return updatedLink;
}

export async function deleteLink(linkId: number, userId: string) {
  await db
    .delete(links)
    .where(eq(links.id, linkId));
}

export async function getLinkById(linkId: number) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId))
    .limit(1);
  
  return link;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return link;
}
