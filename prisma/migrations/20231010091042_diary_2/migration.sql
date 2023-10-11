/*
  Warnings:

  - You are about to drop the column `published` on the `Diary` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Report" (
    "diaryId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "reportBy" TEXT,

    PRIMARY KEY ("diaryId", "authorId"),
    CONSTRAINT "Report_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diary" ("authorId", "content", "createdAt", "id", "title", "views") SELECT "authorId", "content", "createdAt", "id", "title", "views" FROM "Diary";
DROP TABLE "Diary";
ALTER TABLE "new_Diary" RENAME TO "Diary";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
