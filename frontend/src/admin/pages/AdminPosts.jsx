import React, { useMemo, useState } from "react";
import {
  Plus,
  Upload,
  Filter,
  Pencil,
  Trash2,
  Eye,
  X,
  FileText,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";

const MOCK_CATEGORIES = ["News", "Promotion", "Flight Update", "Service"];
const MOCK_STATUSES = ["Scheduled", "Completed", "Delayed", "Cancelled"];

const MOCK_POSTS = [
  {
    id: "POST-001",
    title: "QAirline cập nhật lịch bay Tết 2025",
    category: "News",
    status: "Scheduled",
    author: "Admin",
    createdAt: "2024-12-18",
    attachments: ["tet-2025-schedule.png"],
    excerpt: "Cập nhật lịch bay mới và tăng chuyến nội địa/ quốc tế…",
  },
  {
    id: "POST-002",
    title: "Ưu đãi vé hạng Thương gia cuối năm",
    category: "Promotion",
    status: "Completed",
    author: "Marketing",
    createdAt: "2024-12-15",
    attachments: ["biz-sale-banner.jpg", "terms.pdf"],
    excerpt: "Giảm giá đặc biệt cho Business Class và combo hành lý…",
  },
  {
    id: "POST-003",
    title: "Thông báo điều chỉnh giờ bay SGN–HAN",
    category: "Flight Update",
    status: "Delayed",
    author: "Operation",
    createdAt: "2024-12-14",
    attachments: [],
    excerpt: "Điều chỉnh giờ bay do điều phối khai thác và thời tiết…",
  },
  {
    id: "POST-004",
    title: "Nâng cấp dịch vụ phòng chờ VIP",
    category: "Service",
    status: "Completed",
    author: "Service Team",
    createdAt: "2024-12-10",
    attachments: ["vip-lounge.jpg"],
    excerpt: "Cập nhật tiện ích phòng chờ và các quyền lợi premium…",
  },
  {
    id: "POST-005",
    title: "Thông báo huỷ chuyến do bão",
    category: "Flight Update",
    status: "Cancelled",
    author: "Operation",
    createdAt: "2024-12-09",
    attachments: ["storm-notice.pdf"],
    excerpt: "Một số chuyến bị ảnh hưởng. Vui lòng theo dõi cập nhật…",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatusBadge({ status }) {
  const map = {
    Scheduled: "bg-blue-50 text-blue-700 border-blue-100",
    Completed: "bg-green-50 text-green-700 border-green-100",
    Delayed: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[status] || "bg-gray-50 text-gray-700 border-gray-200"
      )}
    >
      {status}
    </span>
  );
}

function Card({ title, icon: Icon, children, right }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 min-w-0">
          {Icon ? <Icon className="h-4 w-4 text-gray-500" /> : null}
          <h2 className="font-semibold text-gray-900 truncate">{title}</h2>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function AdminPosts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("News");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [q, setQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [density, setDensity] = useState("Comfortable"); // Comfortable | Compact

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.id.toLowerCase().includes(q.toLowerCase());
      const matchCat = filterCategory === "All" || p.category === filterCategory;
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchQ && matchCat && matchStatus;
    });
  }, [q, filterCategory, filterStatus]);

  const rowPad = density === "Compact" ? "py-2" : "py-3";
  const rowText = density === "Compact" ? "text-sm" : "text-sm";

  function handleFakeUpload() {
    // mock "upload"
    setAttachments((prev) => {
      const next = [...prev];
      next.push(`attachment-${prev.length + 1}.png`);
      return next;
    });
  }

  function resetForm() {
    setTitle("");
    setCategory("News");
    setContent("");
    setAttachments([]);
  }

  return (
    <AdminLayout title="Posts" breadcrumb={["Content", "Posts"]}>
      {/* Page intro + primary action */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Create and manage news, promotions and operational updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Upload className="h-4 w-4 text-blue-600" />
            Import
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Layout: form card + list card */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Post */}
        <div className="lg:col-span-2">
          <Card title="Add post" icon={FileText}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                  className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                >
                  {MOCK_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">
                  Use <span className="text-purple-700 font-medium">Purple</span>{" "}
                  accent only for premium-related content.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write content…"
                  className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-200 h-32 resize-none"
                />
              </div>

              <div className="rounded-2xl border border-dashed border-[#D9D9D9] bg-[#F8F7F9] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Attachments
                    </div>
                    <div className="text-xs text-gray-500">
                      Mock upload for UI preview (no backend).
                    </div>
                  </div>
                  <button
                    onClick={handleFakeUpload}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 text-blue-600" />
                    Add
                  </button>
                </div>

                {attachments.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((a, idx) => (
                      <li
                        key={a}
                        className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
                      >
                        <span className="truncate text-gray-700">{a}</span>
                        <button
                          onClick={() =>
                            setAttachments((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          className="h-8 w-8 rounded-xl hover:bg-gray-50 flex items-center justify-center"
                          aria-label="Remove attachment"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 text-xs text-gray-500">
                    No attachments yet.
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Publish
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Post list */}
        <div className="lg:col-span-3">
          <Card
            title={`Post list`}
            icon={Filter}
            right={
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Density:
                </span>
                <div className="flex rounded-xl border border-[#E5E7EB] bg-white p-1">
                  {["Comfortable", "Compact"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDensity(d)}
                      className={cx(
                        "px-3 py-1.5 text-xs font-medium rounded-lg transition",
                        density === d
                          ? "bg-green-50 text-green-800"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            }
          >
            {/* Filters */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by ID or title…"
                    className="w-full sm:w-64 outline-none placeholder:text-gray-400"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="All">All categories</option>
                  {MOCK_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="All">All status</option>
                  {MOCK_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">
                    {filteredPosts.length}
                  </span>{" "}
                  posts
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Upload className="h-4 w-4 text-blue-600" />
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
              <table className="w-full">
                <thead className="bg-[#F8F7F9] text-xs text-gray-600">
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left font-semibold px-4 py-3">
                      Title
                    </th>
                    <th className="text-left font-semibold px-4 py-3">
                      Category
                    </th>
                    <th className="text-left font-semibold px-4 py-3">
                      Status
                    </th>
                    <th className="text-left font-semibold px-4 py-3">
                      Created
                    </th>
                    <th className="text-right font-semibold px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB] bg-white">
                  {filteredPosts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className={cx("px-4", rowPad, rowText)}>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center">
                            <FileText className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 truncate">
                              {p.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                              {p.id} • {p.author} • {p.excerpt}
                            </div>
                            {p.attachments?.length ? (
                              <div className="mt-1 text-xs text-blue-700">
                                {p.attachments.length} attachment
                                {p.attachments.length > 1 ? "s" : ""}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td className={cx("px-4", rowPad, rowText)}>
                        <span className="text-gray-700">{p.category}</span>
                      </td>

                      <td className={cx("px-4", rowPad, rowText)}>
                        <StatusBadge status={p.status} />
                      </td>

                      <td className={cx("px-4", rowPad, rowText)}>
                        <span className="text-gray-700">{p.createdAt}</span>
                      </td>

                      <td className={cx("px-4", rowPad, rowText)}>
                        <div className="flex items-center justify-end gap-2">
                          <button className="h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 flex items-center justify-center">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 flex items-center justify-center">
                            <Pencil className="h-4 w-4 text-gray-700" />
                          </button>
                          <button className="h-9 w-9 rounded-xl border border-red-200 bg-white hover:bg-red-50 flex items-center justify-center">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-gray-500"
                      >
                        No posts found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
