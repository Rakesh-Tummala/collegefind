import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const cities = [
  ["Bengaluru", "Karnataka"], ["Mumbai", "Maharashtra"], ["Delhi", "Delhi"], ["Chennai", "Tamil Nadu"],
  ["Hyderabad", "Telangana"], ["Pune", "Maharashtra"], ["Kolkata", "West Bengal"], ["Ahmedabad", "Gujarat"],
  ["Jaipur", "Rajasthan"], ["Lucknow", "Uttar Pradesh"], ["Kochi", "Kerala"], ["Indore", "Madhya Pradesh"],
  ["Bhubaneswar", "Odisha"], ["Coimbatore", "Tamil Nadu"], ["Chandigarh", "Chandigarh"], ["Guwahati", "Assam"],
  ["Surat", "Gujarat"], ["Nagpur", "Maharashtra"], ["Noida", "Uttar Pradesh"], ["Visakhapatnam", "Andhra Pradesh"]
];

const prefixes = ["National", "Indian", "Global", "Renaissance", "Apex", "Pioneer", "Heritage", "Summit", "Metropolitan", "Eastern"];
const subjects = ["Institute of Technology", "College of Engineering", "School of Management", "University of Applied Sciences", "Institute of Digital Sciences"];
const courses = [
  ["Computer Science Engineering", "B.Tech", "4 years"],
  ["Artificial Intelligence and Data Science", "B.Tech", "4 years"],
  ["Electronics and Communication", "B.Tech", "4 years"],
  ["Business Administration", "BBA", "3 years"],
  ["Finance and Analytics", "MBA", "2 years"],
  ["Design and Human Computer Interaction", "B.Des", "4 years"]
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const demo = await prisma.user.create({
    data: {
      name: "Demo Student",
      email: "demo@collegehub.in",
      passwordHash: await bcrypt.hash("Password123!", 12)
    }
  });

  for (let index = 0; index < 100; index += 1) {
    const [city, state] = cities[index % cities.length];
    const name = `${prefixes[index % prefixes.length]} ${subjects[index % subjects.length]}, ${city}`;
    const feesMin = 90000 + (index % 12) * 25000;
    const feesMax = feesMin + 120000 + (index % 8) * 30000;
    const rating = Number((3.7 + (index % 13) * 0.1).toFixed(1));
    const placementRate = 62 + (index % 31);
    const avgPackage = Number((5.5 + (index % 15) * 0.65).toFixed(1));

    await prisma.college.create({
      data: {
        name,
        slug: `${slugify(name)}-${index + 1}`,
        city,
        state,
        location: `${city}, ${state}`,
        type: index % 3 === 0 ? "Private" : index % 3 === 1 ? "Government" : "Deemed University",
        established: 1955 + (index % 60),
        overview: `${name} is a career-focused institution in ${city} known for strong academics, active industry partnerships, modern labs, and student support for internships, research, and placements.`,
        website: `https://www.${slugify(name).slice(0, 28)}.edu.in`,
        feesMin,
        feesMax,
        rating,
        placementRate,
        avgPackage,
        highestPackage: Number((avgPackage * (2.4 + (index % 5) * 0.25)).toFixed(1)),
        courses: {
          create: courses.slice(0, 4 + (index % 3)).map(([courseName, degree, duration], courseIndex) => ({
            name: courseName,
            degree,
            duration,
            fees: feesMin + courseIndex * 45000,
            seats: 60 + courseIndex * 30
          }))
        },
        reviews: {
          create: [
            {
              userId: demo.id,
              rating: Math.min(5, Math.round(rating)),
              title: "Strong academic environment",
              body: "Faculty mentorship, project culture, and campus hiring support make this a dependable option for focused students."
            }
          ]
        }
      }
    });
  }

  const saved = await prisma.college.findMany({ take: 3, select: { id: true } });
  await prisma.savedCollege.createMany({
    data: saved.map((college) => ({ userId: demo.id, collegeId: college.id })),
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
