import React, { useState } from "react";

const INITIAL_EVENTS = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "1h",
    title: "HIIT & Conditioning",
    category: "Meeting",
    location: "Zoom • Meeting Room A",
    status: "Completed",
    day: "Mon",
  },
  {
    id: 2,
    time: "11:00 AM",
    duration: "1h 30m",
    title: "Foundations Strength",
    category: "Design",
    location: "Figma Live",
    status: "In Progress",
    day: "Mon",
  },
  {
    id: 3,
    time: "02:30 PM",
    duration: "45m",
    title: "Mobility & Core",
    category: "Client",
    location: "Google Meet",
    status: "Upcoming",
    day: "Mon",
  },
  {
    id: 4,
    time: "10:00 AM",
    duration: "2h",
    title: "Sprint Planning",
    category: "Meeting",
    location: "Conference Room 2",
    status: "Upcoming",
    day: "Tue",
  },
  {
    id: 5,
    time: "01:00 PM",
    duration: "1h",
    title: "Backend API Sync",
    category: "Engineering",
    location: "Slack Huddle",
    status: "Upcoming",
    day: "Wed",
  },
];

const DAYS = [
  { short: "Mon", date: "23" },
  { short: "Tue", date: "24" },
  { short: "Wed", date: "25" },
  { short: "Thu", date: "26" },
  { short: "Fri", date: "27" },
];

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("04:00 PM");

  const filteredEvents = events.filter((event) => event.day === selectedDay);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvent = {
      id: Date.now(),
      time: newTime,
      duration: "1h",
      title: newTitle,
      category: "General",
      location: "Online",
      status: "Upcoming",
      day: selectedDay,
    };

    setEvents([...events, newEvent]);
    setNewTitle("");
    setShowModal(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "In Progress":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-indigo-100 text-indigo-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 text-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Schedule
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              November 2026 • Manage your daily sessions and meetings
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition cursor-pointer"
          >
            + Add Event
          </button>
        </div>

        {/* Day Selector */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8">
          {DAYS.map((item) => {
            const isActive = selectedDay === item.short;
            return (
              <button
                key={item.short}
                onClick={() => setSelectedDay(item.short)}
                className={`flex flex-col items-center py-3 rounded-xl border transition cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <span
                  className={`text-xs font-medium uppercase ${
                    isActive ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  {item.short}
                </span>
                <span className="text-lg sm:text-xl font-bold mt-1">
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline / Event List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">
              Agenda for {selectedDay}, Nov{" "}
              {DAYS.find((d) => d.short === selectedDay)?.date}
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "Event" : "Events"}
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No events scheduled for this day.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Time Block */}
                    <div className="w-24 shrink-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {event.time}
                      </p>
                      <p className="text-xs text-slate-400">{event.duration}</p>
                    </div>

                    {/* Vertical Accent Bar */}
                    <div className="hidden sm:block w-1 h-10 rounded-full bg-indigo-500" />

                    {/* Details */}
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="self-start sm:self-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        event.status,
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Simple Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Add Event ({selectedDay})
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Kickoff"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
