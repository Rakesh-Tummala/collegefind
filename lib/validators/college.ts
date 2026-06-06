import { z } from "zod";

export const collegeQuerySchema = z.object({
  q: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  minFee: z.coerce.number().int().min(0).optional(),
  maxFee: z.coerce.number().int().min(0).optional(),
  sort: z.enum(["rating", "feesAsc", "feesDesc", "placement"]).optional().default("rating"),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(30).optional().default(12)
});

export const saveCollegeSchema = z.object({
  collegeId: z.string().min(1)
});
