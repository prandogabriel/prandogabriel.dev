import type { APIRoute } from 'astro';

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get form data
    const formData = await request.formData();
    
    // Extract values
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validate the data
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields',
          received: { name, email, subject, message }
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}
💬 Message: ${message}
    `.trim();

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to send message to Telegram',
          error: errorData,
        }),
        { 
          status: telegramResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully',
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send message',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}; 