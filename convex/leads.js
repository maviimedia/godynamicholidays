import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createLead = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    travelDate: v.string(),
    travellerCount: v.number(),
    message: v.optional(v.string()),
    packageName: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", {
      ...args,
      status: "new"
    });
    return leadId;
  }
});

export const getAllLeads = query({
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  }
});

export const updateLeadStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  }
});