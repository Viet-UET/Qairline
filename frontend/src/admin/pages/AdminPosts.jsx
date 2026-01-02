import React, { useMemo, useState, useRef, useEffect } from "react";
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
  const [showAddModal, setShowAddModal] = useState(false);

  const fileInputRef = useRef(null);

  // Close modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal]);

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

  const rowPad = "py-2";
  const rowText = "text-xs";

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) && !allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      return 'Invalid file type. Only images (jpg, png, webp) and PDF files are allowed.';
    }

    if (file.size > maxSize) {
      return 'File size exceeds 5MB limit.';
    }

    return null;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = [];

    for (const file of files) {
      const error = validateFile(file);
      let preview = null;
      if (!error && file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      newAttachments.push({ file, error, preview });
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = ''; // reset input
  };

  const removeAttachment = (index) => {
    setAttachments(prev => {
      const newAtt = [...prev];
      const att = newAtt[index];
      if (att.preview) URL.revokeObjectURL(att.preview);
      newAtt.splice(index, 1);
      return newAtt;
    });
  };

  function resetForm() {
    setTitle("");
    setCategory("News");
    setContent("");
    setAttachments(prev => {
      prev.forEach(att => {
        if (att.preview) URL.revokeObjectURL(att.preview);
      });
      return [];
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Post
        </button>
      </div>

      {/* Post List */}
      <Card
        title={`Posts (${filteredPosts.length})`}
        icon={Filter}
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
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-[#E5E7EB]">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-[#F8F7F9] text-xs text-gray-600 sticky top-0">
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
                        Meta
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
                        <span className="text-gray-700">{p.author} • {p.createdAt}</span>
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
            </div>
          </Card>

      {/* Add Post Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Add new post</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
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
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-200 h-48 resize-none"
                    />
                  </div>

                  <div className="rounded-2xl border border-dashed border-[#D9D9D9] bg-[#F8F7F9] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Attachments
                        </div>
                        <div className="text-xs text-gray-500">
                          Max 5MB per file. Images (jpg, png, webp) and PDFs only.
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.webp,.pdf"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Upload className="h-4 w-4 text-blue-600" />
                          Add attachment
                        </button>
                      </div>
                    </div>

                    {attachments.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {attachments.map((att, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
                          >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              {att.preview ? (
                                <img src={att.preview} alt="Preview" className="w-8 h-8 object-cover rounded" />
                              ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="truncate text-gray-700">{att.file.name}</span>
                                <div className="text-xs text-gray-500">
                                  {(att.file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                                {att.error && (
                                  <div className="text-xs text-red-600">{att.error}</div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => removeAttachment(index)}
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

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => { resetForm(); setShowAddModal(false); }}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => { /* publish logic */ setShowAddModal(false); }}
                      disabled={attachments.some(att => att.error)}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
