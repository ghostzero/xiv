<template>
  <div class="min-h-screen bg-[#111317] text-slate-300 font-sans selection:bg-amber-700 selection:text-white pb-16">
    <header class="relative bg-gradient-to-b from-[#0f1014] to-[#1a1c23] border-b border-amber-600/30 py-16 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-serif text-amber-500 mb-4 tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          XIV Streamers DACH
        </h1>
        <p class="text-lg text-amber-200/60 font-light tracking-wide">
          Gemeinsam durch Eorzea & auf Twitch
        </p>

        <div class="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="https://discord.gg/JEMADUv3Zz" target="_blank" rel="noopener noreferrer"
             class="group relative px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded transition-all duration-300 shadow-[0_0_15px_rgba(88,101,242,0.3)] hover:shadow-[0_0_25px_rgba(88,101,242,0.6)] flex items-center gap-3">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.68,65.33C38,65.33,34.2,61.14,34.2,56c0-5.12,3.75-9.31,8.48-9.31s8.53,4.19,8.48,9.31C51.16,61.14,47.41,65.33,42.68,65.33Zm41.78,0c-4.73,0-8.48-4.19-8.48-9.31s3.75-9.31,8.48-9.31,8.53,4.19,8.48,9.31C92.94,61.14,89.19,65.33,84.46,65.33Z"/>
            </svg>
            <span class="font-medium tracking-wide">Discord beitreten</span>
          </a>

          <a href="https://forms.gle/qrz9gSTywmj6M82e9" target="_blank" rel="noopener noreferrer"
             class="group relative px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-[#111317] rounded transition-all duration-300 shadow-[0_0_15px_rgba(217,119,6,0.2)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span class="font-bold tracking-wide">Bewerbung einreichen</span>
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
      <div v-if="loading" class="text-center text-amber-500/80 py-20 flex flex-col items-center gap-4">
        <svg class="animate-spin h-10 w-10 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Lade Manifestate der Allager...</p>
      </div>

      <div v-else class="relative bg-[#1a1c23]/90 backdrop-blur-md rounded-lg shadow-2xl border border-[#3e4352] overflow-hidden">
        <div class="h-1 w-full bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>

        <div class="p-8 sm:p-12">
          <div v-html="htmlContent" class="markdown-content"></div>
        </div>

        <div class="h-1 w-full bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    // Lädt die Datei aus /public/manifest.md
    const response = await fetch('/manifest.md')
    if (!response.ok) throw new Error('Manifest konnte nicht geladen werden.')

    const text = await response.text()
    // Konvertiert das Markdown zu HTML
    htmlContent.value = marked(text)
  } catch (error) {
    console.error(error)
    htmlContent.value = '<p class="text-red-400">Fehler beim Laden des Manifests. Bitte lade die Seite neu.</p>'
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* Da marked das HTML dynamisch einfügt, greifen Standard-Tailwind-Klassen nicht automatisch auf Kind-Elemente.
  Hier definieren wir den wunderschönen FFXIV-inspirierten Look für die Markdown-Elemente.
*/
.markdown-content {
  color: #c7d0d9;
  line-height: 1.7;
  font-size: 1.05rem;
}

/* Überschriften */
.markdown-content h1 {
  color: #f59e0b; /* amber-500 */
  font-size: 2.25rem;
  font-weight: 700;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(217, 119, 6, 0.3);
}

.markdown-content h2 {
  color: #fbbf24; /* amber-400 */
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.markdown-content h3 {
  color: #d97706; /* amber-600 */
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Absätze & Text */
.markdown-content p {
  margin-bottom: 1.25rem;
}

.markdown-content strong {
  color: #e2e8f0;
  font-weight: 600;
}

.markdown-content em {
  color: #94a3b8;
  font-style: italic;
}

/* Listen */
.markdown-content ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
  position: relative;
  list-style: none; /* Wir machen eigene Bullets */
}

/* FFXIV-Style Listenpunkte (kleine goldene Quadrate/Rauten) */
.markdown-content li::before {
  content: "✦";
  position: absolute;
  left: -1.5rem;
  color: #d97706; /* amber-600 */
  font-size: 1.1rem;
  line-height: 1.5;
}

/* Trennlinien (---) */
.markdown-content hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(217, 119, 6, 0), rgba(217, 119, 6, 0.5), rgba(217, 119, 6, 0));
  margin: 3rem 0;
}

/* Überschriften */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  /* Zwingt die Überschriften im Manifest auf unsere epische Cinzel-Font */
  font-family: var(--font-serif);
}

.markdown-content h1 {
  color: #f59e0b; /* amber-500 */
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(217, 119, 6, 0.3);
}

.markdown-content h2 {
  color: #fbbf24; /* amber-400 */
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.markdown-content h3 {
  color: #d97706; /* amber-600 */
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}
</style>