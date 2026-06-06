import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CollegeQuery = {
  q: string;
  location: string;
  minFee?: number;
  maxFee?: number;
  sort: "rating" | "feesAsc" | "feesDesc" | "placement";
  page: number;
  pageSize: number;
};

function collegeWhere(query: CollegeQuery): Prisma.CollegeWhereInput {
  return {
    AND: [
      query.q
        ? {
            OR: [
              { name: { contains: query.q, mode: "insensitive" } },
              { city: { contains: query.q, mode: "insensitive" } },
              { state: { contains: query.q, mode: "insensitive" } }
            ]
          }
        : {},
      query.location
        ? {
            OR: [
              { city: { contains: query.location, mode: "insensitive" } },
              { state: { contains: query.location, mode: "insensitive" } },
              { location: { contains: query.location, mode: "insensitive" } }
            ]
          }
        : {},
      typeof query.minFee === "number" ? { feesMax: { gte: query.minFee } } : {},
      typeof query.maxFee === "number" ? { feesMin: { lte: query.maxFee } } : {}
    ]
  };
}

function orderBy(sort: CollegeQuery["sort"]): Prisma.CollegeOrderByWithRelationInput {
  if (sort === "feesAsc") return { feesMin: "asc" };
  if (sort === "feesDesc") return { feesMax: "desc" };
  if (sort === "placement") return { placementRate: "desc" };
  return { rating: "desc" };
}

export async function findColleges(query: CollegeQuery, userId?: string) {
  const where = collegeWhere(query);
  const [items, total] = await prisma.$transaction([
    prisma.college.findMany({
      where,
      orderBy: orderBy(query.sort),
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      include: {
        courses: { take: 2, orderBy: { fees: "asc" } },
        savedBy: userId ? { where: { userId }, select: { id: true } } : false
      }
    }),
    prisma.college.count({ where })
  ]);

  return { items, total };
}

export async function findCollegeById(id: string, userId?: string) {
  return prisma.college.findUnique({
    where: { id },
    include: {
      courses: { orderBy: { fees: "asc" } },
      reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
      savedBy: userId ? { where: { userId }, select: { id: true } } : false
    }
  });
}

export async function findCollegesByIds(ids: string[]) {
  return prisma.college.findMany({
    where: { id: { in: ids.slice(0, 3) } },
    include: { courses: { take: 3, orderBy: { fees: "asc" } } }
  });
}

export async function listLocations() {
  const locations = await prisma.college.findMany({
    distinct: ["state"],
    select: { state: true },
    orderBy: { state: "asc" }
  });
  return locations.map((item) => item.state);
}
