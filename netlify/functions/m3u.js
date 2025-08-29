export async function handler(event, context) {
  try {
    const upstream = "http://getxc.top/get.php?username=joao2025@@@&password=joao20252025&type=m3u_plus&output=hls";

    const r = await fetch(upstream, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "identity",
        "Referer": "http://getxc.top/",   // 👈 muitos painéis exigem isso
        "Connection": "keep-alive",
      },
      redirect: "follow",
    });

    if (!r.ok) {
      return {
        statusCode: r.status,
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