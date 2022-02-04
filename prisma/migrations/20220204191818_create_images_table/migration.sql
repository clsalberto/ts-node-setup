-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image_id" UUID;

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
