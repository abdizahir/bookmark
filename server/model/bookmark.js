import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
   tags: {
      type: [
        {
          name: { type: String, required: true, trim: true, lowercase: true },
          count: { type: Number, default: 1 },
        },
      ],
      required: true,
      set: (value) => {
        const arr = Array.isArray(value)
          ? value
          : String(value || "").split(/\s+/);

        const names = [...new Set(arr.map((t) => String(t).trim().toLowerCase()).filter(Boolean))];
        return names.map((name) => ({ name, count: 1 }));
      },
    },

    isArchived: { type: Boolean, default: false, index: true },
    isPinned: {type: Boolean, default: true},
    visitedCount: { type: Number, default: 0 },
    lastVisitedAt: { type: Date, default: null},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "updatedTime" },
  },
);

bookmarkSchema.index({ user: 1, createdTime: -1 });
bookmarkSchema.index({user: 1, visitedCount: -1, createdTime: -1});
bookmarkSchema.index({ user: 1, lastVisitedAt: -1, createdTime: -1 });

export default mongoose.model("Bookmark", bookmarkSchema);
