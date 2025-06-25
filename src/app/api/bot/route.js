require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Ask AI 📊", web_app: { url: "https://dnauapp.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "🌐 Go Website 🧭", url: "https://dnau.it.com" }],
      [{ text: "🐦 Join Twitter 🧵", url: "https://x.com/AIDatanaut" }],
      [{ text: "📘 Read Docs 📂", url: "https://dnau-ai.gitbook.io/dnau-ai-docs/" }],
      [{ text: "💬 Join Community 📢", url: "https://t.me/dnauAiofficial" }],
      // [{ text: "🔘 Read Master book 📖", url: "https://www.karateinu.xyz" }],
    ],
  };

  const message = `
🧠 Welcome to Datanaut! 🚀
You've just launched your AI trading companion — where intelligence meets precision.

📊 Here's what you can do with Datanaut AI:
🧠 Get real-time market insights powered by advanced AI
📈 Predict trends and generate strategy reports
💬 Ask your trading questions and receive smart, contextual answers
🎯 Stay ahead of the market with data-backed decisions
💰 Earn $DNAU by participating in missions and referring users

🔄 From signal to strategy — your journey to smarter trading starts now.

👇 Tap a button below to get started:
  `;

  const pngUrl = 'https://datanautbot.vercel.app/datanautpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

