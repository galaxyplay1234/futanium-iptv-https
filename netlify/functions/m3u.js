// Netlify Function: proxy da sua playlist M3U (busca em tempo real)
export async function handler(event, context) {
  try {
    const upstream = "http://getxc.top/get.php?username=joao2025@@@&password=joao20252025&type=m3u_plus&output=hls";

    const r = await fetch(upstream, {
      headers: {
        "User-Agent": "FutaniumIPTV-Lite/1.0 (Netlify)",
        // Se o servidor exigir, descomente:
        // "Referer": "http://getxc.top/"
      },
      redirect: "follow",
    });

    if (!r.ok) {
      return {
        statusCode: 502,
        body: `Upstream error: ${r.status}`,
      };
    }

    const txt = await r.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/x-mpegurl; charset=utf-8",
        "Cache-Control": "no-store",
      },
      body: txt,
    };
  } catch (e) {
    return { statusCode: 500, body: "Proxy error: " + e.message };
  }
}
