
type SubmitLeadPayload = {
  name: string
  email?: string
  phone?: string
  message?: string
  service?: string
  source?: string
}

type SubmitLeadResponse = {
  success: boolean
  message?: string
}

export async function submitLead(
  payload: SubmitLeadPayload
): Promise<SubmitLeadResponse> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || "Failed to submit lead")
    }

    const data = (await res.json()) as SubmitLeadResponse
    return data
  } catch (error) {
    console.error("submitLead error:", error)

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}
