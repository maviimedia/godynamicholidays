import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  trips: defineTable({
    title: v.string(),
    slug: v.string(),
    duration: v.object({ days: v.number(), nights: v.number() }),
    route: v.array(v.string()),
    highlights: v.array(v.string()),
    inclusions: v.array(v.string()),
    exclusions: v.array(v.string()),
    thingsToCarry: v.array(v.string()),
    faqs: v.array(v.object({ question: v.string(), answer: v.string() })),
    pricing: v.object({ newPrice: v.number(), oldPrice: v.number() }),
    galleryImages: v.array(v.id("_storage")),
    mainImage: v.id("_storage"),
    isTrending: v.boolean()
  }).index("by_slug", ["slug"]),

  leads: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    travelDate: v.string(),
    travellerCount: v.number(),
    message: v.optional(v.string()),
    packageName: v.optional(v.string()),
    status: v.string()
  })
});