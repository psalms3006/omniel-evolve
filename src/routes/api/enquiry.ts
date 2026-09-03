import { createFileRoute } from "@tanstack/react-router";
import { contactEmail } from "@/lib/omniel";
import { handleEnquiryRequest } from "@/lib/enquiry-handler";

/**
 * POST /api/enquiry
 *
 * Real submission backend for the site's InquiryForm instances, and the
 * target for the server-side Vapi `submit_enquiry` tool (configured in the
 * Vapi Dashboard with this endpoint's production URL — see the deliverable
 * report for the exact contract).
 *
 * All secrets are read from server-only env vars here, never from anything
 * VITE_-prefixed, and never returned in a response body.
 */
export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleEnquiryRequest(request, {
          resendApiKey: process.env["RESEND_API_KEY"],
          fromEmail: process.env["RESEND_FROM_EMAIL"],
          toEmail: process.env["OMNIEL_ENQUIRY_EMAIL"] || contactEmail,
        }),
    },
  },
});
