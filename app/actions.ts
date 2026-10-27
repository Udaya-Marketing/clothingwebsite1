"use server";

export type NewsletterState = {
  message: string;
  success: boolean;
};

export async function subscribeToNewsletter(
  _previousState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const consent = formData.get("consent") === "on";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Please enter a valid email address.", success: false };
  }
  if (!consent) {
    return { message: "Please consent to receive occasional studio notes.", success: false };
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    return {
      message: "Newsletter sign-up is not connected yet. Please check back soon.",
      success: false,
    };
  }

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`serein:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "pending" }),
      cache: "no-store",
    },
  );

  if (!response.ok && response.status !== 400) {
    throw new Error(`Mailchimp subscription failed with status ${response.status}.`);
  }
  if (response.status === 400) {
    const result = (await response.json()) as { title?: string };
    if (result.title !== "Member Exists") {
      return { message: "We couldn't add that address. Please check it and try again.", success: false };
    }
  }

  return { message: "Please check your inbox to confirm your subscription.", success: true };
}
