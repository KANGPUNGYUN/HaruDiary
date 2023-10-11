-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "isPublic" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diary" ("authorId", "content", "createdAt", "id", "isPublic", "title", "views") SELECT "authorId", "content", "createdAt", "id", "isPublic", "title", "views" FROM "Diary";
DROP TABLE "Diary";
ALTER TABLE "new_Diary" RENAME TO "Diary";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
