import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'element-inspector',
      transformIndexHtml(html) {
        const inspectorScript = `
<style>
.vxc-hover-overlay { position: absolute; background-color: rgba(0, 123, 255, 0.2); pointer-events: none; z-index: 9998; display: none; }
.vxc-tag-label { position: absolute; background: blue; color: white; padding: 2px 6px; font-size: 12px; border-radius: 4px; z-index: 9999; pointer-events: none; }
.vxc-highlighted { outline: 2px solid blue !important; }
</style>
<script>
document.addEventListener("DOMContentLoaded", function() {
  var previouslyHighlighted = null;
  var tagLabel = null;
  var highlightingEnabled = false;
  var hoverOverlay = document.createElement("div");
  hoverOverlay.className = "vxc-hover-overlay";
  document.body.appendChild(hoverOverlay);

  window.addEventListener("message", function(event) {
    if (event.data && typeof event.data.toggleHighlighter === "boolean") {
      highlightingEnabled = event.data.toggleHighlighter;
      if (!highlightingEnabled) {
        hoverOverlay.style.display = "none";
        if (previouslyHighlighted) previouslyHighlighted.classList.remove("vxc-highlighted");
        if (tagLabel) { tagLabel.remove(); tagLabel = null; }
      }
    }
  });

  document.body.addEventListener("mousemove", function(e) {
    if (!highlightingEnabled) return;
    var el = e.target;
    if (!(el instanceof HTMLElement)) return;
    var rect = el.getBoundingClientRect();
    hoverOverlay.style.display = "block";
    hoverOverlay.style.top = (window.scrollY + rect.top) + "px";
    hoverOverlay.style.left = (window.scrollX + rect.left) + "px";
    hoverOverlay.style.width = rect.width + "px";
    hoverOverlay.style.height = rect.height + "px";
  });

  document.body.addEventListener("mouseleave", function() {
    if (highlightingEnabled) hoverOverlay.style.display = "none";
  });

  document.body.addEventListener("click", function(e) {
    if (!highlightingEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    var target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (previouslyHighlighted) { previouslyHighlighted.classList.remove("vxc-highlighted"); }
    if (tagLabel) { tagLabel.remove(); }
    target.classList.add("vxc-highlighted");
    previouslyHighlighted = target;

    tagLabel = document.createElement("div");
    tagLabel.innerText = "<" + target.tagName.toLowerCase() + ">";
    tagLabel.className = "vxc-tag-label";
    var rect = target.getBoundingClientRect();
    tagLabel.style.top = (window.scrollY + rect.top - 20) + "px";
    tagLabel.style.left = (window.scrollX + rect.left) + "px";
    document.body.appendChild(tagLabel);

    var html = target.outerHTML;
    navigator.clipboard.writeText(html).then(function() {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          selectedTagName: target.tagName,
          selectedOuterHTML: target.outerHTML
        }, "*");
      }
      console.log("Copied HTML to clipboard:", html);
    });
  }, true);
});
</script>`;
        return html.replace('</body>', inspectorScript + '</body>');
      }
    }
  ],
  resolve: {
    alias: {
      '@': '/home/project/src',
    },
  },
});
