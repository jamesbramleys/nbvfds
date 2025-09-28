// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "element-inspector",
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
        return html.replace("</body>", inspectorScript + "</body>");
      }
    }
  ],
  resolve: {
    alias: {
      "@": "/home/project/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHtcbiAgICAgIG5hbWU6ICdlbGVtZW50LWluc3BlY3RvcicsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xuICAgICAgICBjb25zdCBpbnNwZWN0b3JTY3JpcHQgPSBgXG48c3R5bGU+XG4udnhjLWhvdmVyLW92ZXJsYXkgeyBwb3NpdGlvbjogYWJzb2x1dGU7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTIzLCAyNTUsIDAuMik7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiA5OTk4OyBkaXNwbGF5OiBub25lOyB9XG4udnhjLXRhZy1sYWJlbCB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYmFja2dyb3VuZDogYmx1ZTsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAycHggNnB4OyBmb250LXNpemU6IDEycHg7IGJvcmRlci1yYWRpdXM6IDRweDsgei1pbmRleDogOTk5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cbi52eGMtaGlnaGxpZ2h0ZWQgeyBvdXRsaW5lOiAycHggc29saWQgYmx1ZSAhaW1wb3J0YW50OyB9XG48L3N0eWxlPlxuPHNjcmlwdD5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgcHJldmlvdXNseUhpZ2hsaWdodGVkID0gbnVsbDtcbiAgdmFyIHRhZ0xhYmVsID0gbnVsbDtcbiAgdmFyIGhpZ2hsaWdodGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgdmFyIGhvdmVyT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvdmVyT3ZlcmxheS5jbGFzc05hbWUgPSBcInZ4Yy1ob3Zlci1vdmVybGF5XCI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG92ZXJPdmVybGF5KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YSAmJiB0eXBlb2YgZXZlbnQuZGF0YS50b2dnbGVIaWdobGlnaHRlciA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGhpZ2hsaWdodGluZ0VuYWJsZWQgPSBldmVudC5kYXRhLnRvZ2dsZUhpZ2hsaWdodGVyO1xuICAgICAgaWYgKCFoaWdobGlnaHRpbmdFbmFibGVkKSB7XG4gICAgICAgIGhvdmVyT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGlmIChwcmV2aW91c2x5SGlnaGxpZ2h0ZWQpIHByZXZpb3VzbHlIaWdobGlnaHRlZC5jbGFzc0xpc3QucmVtb3ZlKFwidnhjLWhpZ2hsaWdodGVkXCIpO1xuICAgICAgICBpZiAodGFnTGFiZWwpIHsgdGFnTGFiZWwucmVtb3ZlKCk7IHRhZ0xhYmVsID0gbnVsbDsgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoIWhpZ2hsaWdodGluZ0VuYWJsZWQpIHJldHVybjtcbiAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaG92ZXJPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgaG92ZXJPdmVybGF5LnN0eWxlLnRvcCA9ICh3aW5kb3cuc2Nyb2xsWSArIHJlY3QudG9wKSArIFwicHhcIjtcbiAgICBob3Zlck92ZXJsYXkuc3R5bGUubGVmdCA9ICh3aW5kb3cuc2Nyb2xsWCArIHJlY3QubGVmdCkgKyBcInB4XCI7XG4gICAgaG92ZXJPdmVybGF5LnN0eWxlLndpZHRoID0gcmVjdC53aWR0aCArIFwicHhcIjtcbiAgICBob3Zlck92ZXJsYXkuc3R5bGUuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyBcInB4XCI7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKGhpZ2hsaWdodGluZ0VuYWJsZWQpIGhvdmVyT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoIWhpZ2hsaWdodGluZ0VuYWJsZWQpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG4gICAgaWYgKHByZXZpb3VzbHlIaWdobGlnaHRlZCkgeyBwcmV2aW91c2x5SGlnaGxpZ2h0ZWQuY2xhc3NMaXN0LnJlbW92ZShcInZ4Yy1oaWdobGlnaHRlZFwiKTsgfVxuICAgIGlmICh0YWdMYWJlbCkgeyB0YWdMYWJlbC5yZW1vdmUoKTsgfVxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwidnhjLWhpZ2hsaWdodGVkXCIpO1xuICAgIHByZXZpb3VzbHlIaWdobGlnaHRlZCA9IHRhcmdldDtcblxuICAgIHRhZ0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YWdMYWJlbC5pbm5lclRleHQgPSBcIjxcIiArIHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKyBcIj5cIjtcbiAgICB0YWdMYWJlbC5jbGFzc05hbWUgPSBcInZ4Yy10YWctbGFiZWxcIjtcbiAgICB2YXIgcmVjdCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0YWdMYWJlbC5zdHlsZS50b3AgPSAod2luZG93LnNjcm9sbFkgKyByZWN0LnRvcCAtIDIwKSArIFwicHhcIjtcbiAgICB0YWdMYWJlbC5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5zY3JvbGxYICsgcmVjdC5sZWZ0KSArIFwicHhcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhZ0xhYmVsKTtcblxuICAgIHZhciBodG1sID0gdGFyZ2V0Lm91dGVySFRNTDtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChodG1sKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHdpbmRvdy5wYXJlbnQgJiYgd2luZG93LnBhcmVudCAhPT0gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHNlbGVjdGVkVGFnTmFtZTogdGFyZ2V0LnRhZ05hbWUsXG4gICAgICAgICAgc2VsZWN0ZWRPdXRlckhUTUw6IHRhcmdldC5vdXRlckhUTUxcbiAgICAgICAgfSwgXCIqXCIpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJDb3BpZWQgSFRNTCB0byBjbGlwYm9hcmQ6XCIsIGh0bWwpO1xuICAgIH0pO1xuICB9LCB0cnVlKTtcbn0pO1xuPC9zY3JpcHQ+YDtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgnPC9ib2R5PicsIGluc3BlY3RvclNjcmlwdCArICc8L2JvZHk+Jyk7XG4gICAgICB9XG4gICAgfVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogJy9ob21lL3Byb2plY3Qvc3JjJyxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLE1BQU07QUFDdkIsY0FBTSxrQkFBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBFeEIsZUFBTyxLQUFLLFFBQVEsV0FBVyxrQkFBa0IsU0FBUztBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
