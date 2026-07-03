import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed initial Super Admin
  const adminEmail = 'admin@hyperfast.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    });
    console.log('Created super admin account:', admin.email);
  } else {
    console.log('Super admin account already exists');
  }

  // 2. Seed initial Settings
  const existingSeo = await prisma.sEOSettings.findUnique({
    where: { type: 'GLOBAL' },
  });

  if (!existingSeo) {
    await prisma.sEOSettings.create({
      data: {
        type: 'GLOBAL',
        title: 'HyperFast - Tăng Tốc Game & Giảm Ping Hàng Đầu Việt Nam',
        description: 'Dịch vụ giảm ping, giảm lag đột phá cho mọi game thủ Việt Nam.',
        keywords: 'giam ping, giam lag, hyperfast, tang toc game',
      },
    });
    console.log('Created default SEO settings');
  }

  // 3. Seed Footer settings
  const existingFooter = await prisma.footerSettings.findFirst();
  if (!existingFooter) {
    await prisma.footerSettings.create({
      data: {
        id: 'footer-settings-id',
        address: '123 Đường Tăng Tốc, Quận Game Thủ, TP. Hồ Chí Minh',
        email: 'contact@hyperfast.vn',
        hotline: '1900-1234',
        socialMedia: JSON.stringify({
          facebook: 'https://facebook.com/hyperfast',
          youtube: 'https://youtube.com/hyperfast',
        }),
      },
    });
    console.log('Created default Footer settings');
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
