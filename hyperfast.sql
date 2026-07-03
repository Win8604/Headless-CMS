-- Tạo Database
CREATE DATABASE IF NOT EXISTS hyperfast
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE hyperfast;

-- ==========================================
-- USER
-- ==========================================

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN','ADMIN','EDITOR','VIEWER') NOT NULL DEFAULT 'VIEWER',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- BANNER
-- ==========================================

CREATE TABLE banners (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(500) NOT NULL,
    button_text VARCHAR(255) NULL,
    button_url VARCHAR(500) NULL,
    `order` INT NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- PACKAGE
-- ==========================================

CREATE TABLE packages (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    features TEXT NOT NULL,
    image_url VARCHAR(500) NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- GAME
-- ==========================================

CREATE TABLE games (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    image_url VARCHAR(500) NULL,
    seo_title VARCHAR(255) NULL,
    seo_description TEXT NULL,
    seo_keywords VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- TECHNOLOGY
-- ==========================================

CREATE TABLE technologies (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(500) NULL,
    `order` INT NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- FAQ
-- ==========================================

CREATE TABLE faqs (
    id VARCHAR(36) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- MENU
-- ==========================================

CREATE TABLE menus (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    `order` INT NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- FOOTER SETTINGS
-- ==========================================

CREATE TABLE footer_settings (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'footer-settings-id',
    address TEXT NULL,
    email VARCHAR(255) NULL,
    hotline VARCHAR(100) NULL,
    social_media TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- SEO SETTINGS
-- ==========================================

CREATE TABLE seo_settings (
    id VARCHAR(36) PRIMARY KEY,
    type VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NULL,
    description TEXT NULL,
    keywords VARCHAR(500) NULL,
    og_image VARCHAR(500) NULL,
    canonical_url VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- MEDIA
-- ==========================================

CREATE TABLE media (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    size INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    folder VARCHAR(255) DEFAULT '/',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SETTINGS
-- ==========================================

CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY,
    `key` VARCHAR(255) NOT NULL UNIQUE,
    `value` TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_banner_status ON banners(status);
CREATE INDEX idx_banner_order ON banners(`order`);

CREATE INDEX idx_package_status ON packages(status);

CREATE INDEX idx_technology_status ON technologies(status);
CREATE INDEX idx_technology_order ON technologies(`order`);

CREATE INDEX idx_faq_category ON faqs(category);
CREATE INDEX idx_faq_status ON faqs(status);

CREATE INDEX idx_menu_order ON menus(`order`);
CREATE INDEX idx_menu_status ON menus(status);

CREATE INDEX idx_media_folder ON media(folder);

CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_seo_type ON seo_settings(type);