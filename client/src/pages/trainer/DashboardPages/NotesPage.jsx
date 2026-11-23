import React, { useState } from "react";

const initialNotes = [
  {
    id: 1,
    clientName: "Alex Rivera",
    category: "Injury",
    date: "Nov 20, 2026",
    content:
      "Mild lower back tightness during deadlifts. Switch to trap bar deadlifts and add 10 mins of core mobility warm-up.",
  },
  {
    id: 2,
    clientName: "Sarah Jenkins",
    category: "Progress",
    date: "Nov 21, 2026",
    content:
      "Hit a new PR on bench press: 65kg for 5 reps! Ready to move into a hypertrophy block next week.",
  },
  {
    id: 3,
    clientName: "Marcus Vance",
    category: "Nutrition",
    date: "Nov 22, 2026",
    content:
      "Struggling to hit 180g protein target. Suggested adding a casein shake before bed and Greek yogurt post-workout.",
  },
];

const categoryColors = {
  Workout: "bg-blue-100 text-blue-800 border-blue-200",
  Injury: "bg-red-100 text-red-800 border-red-200",
  Progress: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Nutrition: "bg-amber-100 text-amber-800 border-amber-200",
};

const NotesPage = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form state
  const [clientName, setClientName] = useState("");
  const [category, setCategory] = useState("Workout");
  const [content, setContent] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      clientName: clientName.trim(),
      category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      content: content.trim(),
    };

    setNotes([newNote, ...notes]);
    setClientName("");
    setContent("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Trainer Notes</h1>
          <p className="text-slate-500 mt-1">
            Track client progress, injury modifications, and session feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Add Note Form */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleAddNote}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Add Session Note
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jordan Smith"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="Workout">Workout</option>
                    <option value="Progress">Progress</option>
                    <option value="Injury">Injury / Mobility</option>
                    <option value="Nutrition">Nutrition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Observation / Note
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write form cues, weight adjustments, or feedback..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 cursor-pointer text-sm"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Filter & Notes List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Category Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <input
                type="text"
                placeholder="Search by client or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {["All", "Workout", "Progress", "Injury", "Nutrition"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
              <div className="bg-white p-10 rounded-xl border border-slate-200 text-center text-slate-500">
                No trainer notes found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-base">
                            {note.clientName}
                          </h3>
                          <span className="text-xs text-slate-400">
                            {note.date}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                            categoryColors[note.category] ||
                            "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {note.category}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {note.content}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
