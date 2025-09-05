/*
  Warnings:

  - You are about to drop the `Rules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rules";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "rules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stock_control" BOOLEAN NOT NULL,
    "low_stock_alert" BOOLEAN NOT NULL,
    "register_product" BOOLEAN NOT NULL,
    "disable_product" BOOLEAN NOT NULL,
    "edit_stock" BOOLEAN NOT NULL,
    "users_registered" BOOLEAN NOT NULL,
    "stock_list" BOOLEAN NOT NULL,
    "edit_user" BOOLEAN NOT NULL,
    "dashboard_invoicing" BOOLEAN NOT NULL,
    "recipes" BOOLEAN NOT NULL,
    "pricing" BOOLEAN NOT NULL,
    "new_offer" BOOLEAN NOT NULL,
    "shop_cart" BOOLEAN NOT NULL,
    "my_purchases" BOOLEAN NOT NULL,
    "profile" BOOLEAN NOT NULL,
    "sum_stock" BOOLEAN NOT NULL,
    "disable_user" BOOLEAN NOT NULL,
    "purchasing_report" BOOLEAN NOT NULL,
    "user_list" BOOLEAN NOT NULL,
    "user_status" BOOLEAN NOT NULL,
    "product_status" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
