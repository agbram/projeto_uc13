-- CreateTable
CREATE TABLE "carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "carts_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pix" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "value" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "order_detail" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pass" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth" DATETIME NOT NULL,
    "credit_card" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rules" (
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

-- CreateTable
CREATE TABLE "Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchase_client_name" TEXT NOT NULL,
    "purchase_client_address" TEXT NOT NULL,
    "purchased_products" TEXT NOT NULL,
    "purchase_payment_form" TEXT NOT NULL,
    "purchased_quantity" INTEGER NOT NULL,
    "purchase_price" REAL NOT NULL,
    "is_finished" BOOLEAN NOT NULL,
    "is_shipped" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "product_price" REAL NOT NULL,
    "is_in_stock" BOOLEAN NOT NULL,
    "amount_in_stock" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
