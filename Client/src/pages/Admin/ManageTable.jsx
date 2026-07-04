import React, { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";

function ManageTable() {
  const { token, user } = React.useContext(AppContext);

  const [tableNumber, setTableNumber] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchQRCodes();
  }, [token]);

  const fetchQRCodes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/qr`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const generate = async (e) => {
    e.preventDefault();
    setError("");

    const n = Number(tableNumber);
    if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
      setError("Enter a valid table number");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch(`${backendUrl}/api/qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({ tableNumber: n }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Failed to generate QR");
        return;
      }

      setItems((prev) => {
        const next = prev.filter((x) => x.tableNumber !== n);
        // Add _id if not present to use as key instead of tableNumber for safety
        next.unshift({ ...data, _id: data._id || `table-${n}` });
        return next;
      });

      setTableNumber("");
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const download = (item) => {
    const a = document.createElement("a");
    a.href = item.dataUrl;
    a.download = `table-${item.tableNumber}.png`;
    a.click();
  };

  const removeQR = async (tableNumber) => {
    try {
      const res = await fetch(`${backendUrl}/api/qr/${tableNumber}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
      if (res.ok) {
        setItems((prev) => prev.filter((x) => x.tableNumber !== tableNumber));
      }
    } catch {
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
        Admin access required
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Manage Tables</h2>
      <p className="text-gray-500 text-sm mb-6">Generate QR codes for table numbers.</p>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={generate}
        className="bg-white rounded-2xl border border-gray-200 p-6 max-w-xl"
      >
        <label className="text-sm font-medium text-gray-700">Table Number</label>
        <div className="mt-2 flex gap-3">
          <input
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            placeholder="e.g. 1"
            inputMode="numeric"
          />
          <button
            type="submit"
            disabled={generating}
            className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Generate QR"}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated QRs</h3>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
            Loading QR codes...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
            No QR codes generated yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <div key={item._id || item.tableNumber} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Table {item.tableNumber}</p>
                    <p className="text-xs text-gray-500 break-all mt-1">{item.url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQR(item.tableNumber)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 p-4">
                  <img
                    src={item.dataUrl}
                    alt={`Table ${item.tableNumber} QR`}
                    className="w-44 h-44"
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => download(item)}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    Download
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    Open Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageTable;
