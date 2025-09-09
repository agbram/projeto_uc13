-- CreateTable
CREATE TABLE "user_rules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "ruleId" INTEGER NOT NULL,
    CONSTRAINT "user_rules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_rules_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "rules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_rules_userId_ruleId_key" ON "user_rules"("userId", "ruleId");
