/*
  Warnings:

  - You are about to drop the column `purchased_products` on the `purchases` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchase_payment_form" TEXT NOT NULL,
    "purchased_quantity" INTEGER NOT NULL,
    "purchase_price" REAL NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_shipped" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER,
    CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchases_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_purchases" ("created_at", "id", "is_finished", "is_shipped", "order_id", "purchase_payment_form", "purchase_price", "purchased_quantity", "updated_at", "user_id") SELECT "created_at", "id", "is_finished", "is_shipped", "order_id", "purchase_payment_form", "purchase_price", "purchased_quantity", "updated_at", "user_id" FROM "purchases";
DROP TABLE "purchases";
ALTER TABLE "new_purchases" RENAME TO "purchases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
