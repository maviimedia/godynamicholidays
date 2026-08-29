import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTrip = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const tripId = await ctx.db.insert("trips", args);
    return tripId;
  }
});

export const getAllTrips = query({
  handler: async (ctx) => {
    const trips = await ctx.db.query("trips").order("desc").collect();
    return Promise.all(
      trips.map(async (trip) => ({
        ...trip,
        mainImageUrl: await ctx.storage.getUrl(trip.mainImage)
      }))
    );
  }
});

export const getTripBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const trip = await ctx.db
      .query("trips")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!trip) return null;

    const mainImageUrl = await ctx.storage.getUrl(trip.mainImage);
    const galleryImageUrls = await Promise.all(
      (trip.galleryImages || []).map((id) => ctx.storage.getUrl(id))
    );

    return { ...trip, mainImageUrl, galleryImageUrls };
  }
});

export const deleteTrip = mutation({
  args: { id: v.id("trips") },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.id);
    if (trip) {
      if (trip.mainImage) await ctx.storage.delete(trip.mainImage);
      if (trip.galleryImages) {
        for (const imgId of trip.galleryImages) {
          await ctx.storage.delete(imgId);
        }
      }
      await ctx.db.delete(args.id);
    }
  }
});

export const getTripById = query({
  args: { id: v.id("trips") },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.id);
    if (!trip) return null;
    return trip;
  }
});

export const updateTrip = mutation({
  args: {
    id: v.id("trips"),
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
    isTrending: v.boolean(),
    mainImage: v.optional(v.id("_storage")),
    galleryImages: v.optional(v.array(v.id("_storage")))
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  }
});