-- Prisma'nın pg adaptörü tarihleri UTC saatiyle ama saat dilimi belirtmeden gönderir.
-- Oturum saat dilimi UTC değilse (ör. yerelde Europe/Istanbul) timestamptz değerleri kayar.
-- Veritabanının varsayılan saat dilimini UTC yapar; yeni bağlantılarda geçerli olur.
DO $$
BEGIN
  EXECUTE format('ALTER DATABASE %I SET timezone TO %L', current_database(), 'UTC');
END
$$;
