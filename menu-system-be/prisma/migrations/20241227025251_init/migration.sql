-- CreateTable
CREATE TABLE "SystemMenu" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,
    "tbl_menus_id" TEXT,

    CONSTRAINT "SystemMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SystemMenu" ADD CONSTRAINT "SystemMenu_tbl_menus_id_fkey" FOREIGN KEY ("tbl_menus_id") REFERENCES "SystemMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
