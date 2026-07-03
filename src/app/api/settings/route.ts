import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'seo' or 'footer' or 'general'

    if (type === 'seo') {
      const seoType = searchParams.get('seoType') || 'GLOBAL';
      const seo = await prisma.sEOSettings.findUnique({
        where: { type: seoType },
      });
      return NextResponse.json(seo || {});
    }

    if (type === 'footer') {
      const footer = await prisma.footerSettings.findFirst();
      return NextResponse.json(footer || {});
    }

    // Default to general settings
    const settings = await prisma.setting.findMany();
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { action, data } = body;

    if (action === 'save_seo') {
      const { type, title, description, keywords, ogImage, canonicalUrl } = data;
      if (!type) {
        return NextResponse.json({ error: 'SEO type is required' }, { status: 400 });
      }
      const seo = await prisma.sEOSettings.upsert({
        where: { type },
        update: { title, description, keywords, ogImage, canonicalUrl },
        create: { type, title, description, keywords, ogImage, canonicalUrl },
      });
      return NextResponse.json(seo);
    }

    if (action === 'save_footer') {
      const { address, email, hotline, socialMedia } = data;
      const footer = await prisma.footerSettings.upsert({
        where: { id: 'footer-settings-id' },
        update: { address, email, hotline, socialMedia },
        create: { id: 'footer-settings-id', address, email, hotline, socialMedia },
      });
      return NextResponse.json(footer);
    }

    if (action === 'save_general') {
      const { key, value } = data;
      if (!key) {
        return NextResponse.json({ error: 'Setting key is required' }, { status: 400 });
      }
      const setting = await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      return NextResponse.json(setting);
    }

    return NextResponse.json({ error: 'Invalid settings action' }, { status: 400 });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
