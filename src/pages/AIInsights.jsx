import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";

export default function AIInsights() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState("");
  const [error, setError] = useState("");

  // EXPORT AI INSIGHTS TO PDF
  const exportToPDF = () => {
    if (!insights) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = 20;

    const addPageIfNeeded = (height = 10) => {
      if (y + height > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // TITLE 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Performance Insights", pageWidth / 2, y, { align: "center" });
    y += 12;

    // INTRO 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const sections = insights.split("\n");

    sections.forEach((line) => {
      line = line.trim();
      if (!line) return;

      // SECTION HEADINGS
      if (line.startsWith("## ")) {
        addPageIfNeeded(12);
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(line.replace("## ", ""), margin, y);
        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        return;
      }

      // SUB-HEADINGS
      if (line.startsWith("### ")) {
        addPageIfNeeded(10);
        y += 4;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(line.replace("### ", ""), margin, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        return;
      }

      // MARKDOWN HEADING 
      if (/^\*\*.*\*\*$/.test(line)) {
        const headingText = line.replace(/\*\*/g, "");

        addPageIfNeeded(10);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(headingText, margin, y);

        y += 8;

        // Reset font
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        return;
      }

      // ITALIC LABELS
      if (/^\*.*\*:/.test(line)) {
        const parts = line.split(":");
        const label = parts[0].replace(/\*/g, ""); 
        const text = parts.slice(1).join(":").trim();

        addPageIfNeeded(8);

        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, margin, y);

        const labelWidth = doc.getTextWidth(`${label}: `);

        doc.setFont("helvetica", "normal");
        doc.text(text, margin + labelWidth, y);

        y += 6;
        return;
      }

      // BULLET POINTS WITH BOLD SUPPORT
      if (line.startsWith("* ")) {
        let content = line.replace("* ", "");

        
        const boldMatch = content.match(/\*\*(.*?)\*\*/);

        if (boldMatch) {
          const before = content.split("**")[0];
          const boldText = boldMatch[1];
          const after = content.split("**")[2] || "";

          addPageIfNeeded(8);

          // Normal text before bold
          doc.setFont("helvetica", "normal");
          doc.text("• " + before, margin + 4, y);

          // Bold part
          const boldX = margin + 4 + doc.getTextWidth("• " + before);
          doc.setFont("helvetica", "bold");
          doc.text(boldText, boldX, y);

          // Remaining normal text
          const afterX = boldX + doc.getTextWidth(boldText);
          doc.setFont("helvetica", "normal");
          doc.text(after, afterX, y);

          y += 6;
        } else {
          // Normal bullet
          const lines = doc.splitTextToSize(
            "• " + content,
            pageWidth - margin * 2 - 4
          );
          addPageIfNeeded(lines.length * 6);
          doc.text(lines, margin + 4, y);
          y += lines.length * 6;
        }

        return;
      }

      // NUMBERED LISTS
      if (/^\d+\./.test(line)) {
        const lines = doc.splitTextToSize(line, pageWidth - margin * 2);
        addPageIfNeeded(lines.length * 6);
        doc.text(lines, margin, y);
        y += lines.length * 6;
        return;
      }

      // NORMAL PARAGRAPH
      const lines = doc.splitTextToSize(line, pageWidth - margin * 2);
      addPageIfNeeded(lines.length * 6);
      doc.text(lines, margin, y);
      y += lines.length * 6;
    });

    doc.save("AI_Performance_Insights.pdf");
  };

  // FETCH WORKOUTS
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/workouts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setWorkouts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch workouts");
      }
    };

    fetchWorkouts();
  }, []);

  // GENERATE AI INSIGHTS
  const generateInsights = async () => {
    if (!workouts.length) {
      setError("No workout data available for AI analysis");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/analyze`,
        { workouts },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
      setError("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        AI Performance Insights
      </h2>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <Button onClick={generateInsights} disabled={loading}>
          {loading ? "Analyzing..." : "Generate AI Insights"}
        </Button>

        {insights && (
          <Button variant="secondary" onClick={exportToPDF}>
            Export PDF
          </Button>
        )}
      </div>

      {/* ERROR */}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* AI OUTPUT */}
      {insights && (
        <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-6">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {insights}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
