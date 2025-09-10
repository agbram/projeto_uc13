/*
  Warnings:

  - You are about to drop the column `purchase_client_address` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_client_name` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchased_products" TEXT NOT NULL,
    "purchase_payment_form" TEXT NOT NULL,
    "purchased_quantity" INTEGER NOT NULL,
    "purchase_price" REAL NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_shipped" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchases_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchases" ("created_at", "id", "is_finished", "is_shipped", "purchase_payment_form", "purchase_price", "purchased_products", "purchased_quantity", "updated_at") SELECT "created_at", "id", "is_finished", "is_shipped", "purchase_payment_form", "purchase_price", "purchased_products", "purchased_quantity", "updated_at" FROM "purchases";
DROP TABLE "purchases";
ALTER TABLE "new_purchases" RENAME TO "purchases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
