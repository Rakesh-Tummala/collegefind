import { prisma } from "@/lib/prisma";

export async function saveCollege(userId: string, collegeId: string) {
  return prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId, collegeId } },
    update: {},
    create: { userId, collegeId }
  });
}

export async function removeSavedCollege(userId: string, collegeId: string) {
  await prisma.savedCollege.deleteMany({ where: { userId, collegeId } });
}

export async function getSavedColleges(userId: string) {
  return prisma.savedCollege.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      college: {
        include: {
          courses: { take: 2, orderBy: { fees: "asc" } },
          savedBy: { where: { userId }, select: { id: true } }
        }
      }
    }
  });
}
