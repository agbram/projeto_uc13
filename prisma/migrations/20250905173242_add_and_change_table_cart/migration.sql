/*
  Warnings:

  - Added the required column `product_type` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_quantity" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "carts_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_carts" ("created_at", "id", "order_id", "product_name", "product_quantity", "stock_id", "updated_at") SELECT "created_at", "id", "order_id", "product_name", "product_quantity", "stock_id", "updated_at" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
