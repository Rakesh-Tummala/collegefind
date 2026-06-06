import { collegeQuerySchema } from "@/lib/validators/college";
import { findCollegeById, findColleges, findCollegesByIds, listLocations } from "@/lib/repositories/college-repository";

export async function getCollegeSearch(searchParams: Record<string, string | string[] | undefined>, userId?: string) {
  const normalized = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );
  const query = collegeQuerySchema.parse(normalized);
  const { items, total } = await findColleges(query, userId);
  return {
    items,
    page: query.page,
    pageSize: query.pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / query.pageSize))
  };
}

export async function getCollegeDetail(id: string, userId?: string) {
  return findCollegeById(id, userId);
}

export async function getCompareColleges(ids: string[]) {
  return findCollegesByIds(ids);
}

export async function getLocations() {
  return listLocations();
}
