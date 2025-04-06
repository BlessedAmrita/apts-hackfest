from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
import os
import json
from fpdf import FPDF
import google.generativeai as genai
from datetime import datetime

# ========== CONFIG ==========
GEMINI_API_KEY = "AIzaSyBWBlKUB4aDp36LZg0eAeQXHcf7LhEee20"
OUTPUT_DIR = "generated_pdfs"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")
# ============================

app = FastAPI()


def build_prompt(feedback_data: dict) -> str:
    return f"""
You are an expert event consultant.

Below is the summarized data collected from an event. Based on this data:
1. Write a clear, concise summary of the overall attendee sentiment.
2. Highlight the top 3-5 most common issues or complaints.
3. List the top things attendees appreciated.
4. Provide actionable suggestions for improving future events.

Ensure the output is well-structured using bullet points and headings.

Event Feedback Data:
{json.dumps(feedback_data, indent=2)}
    """


def get_summary_from_gemini(data: dict) -> str:
    prompt = build_prompt(data)
    response = model.generate_content(prompt)
    return response.text.strip()


def generate_pdf(summary_text: str, filename: str) -> str:
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    pdf_path = os.path.join(OUTPUT_DIR, filename)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for line in summary_text.split("\n"):
        pdf.multi_cell(0, 10, line)

    pdf.output(pdf_path)
    return pdf_path


@app.post("/generate-summary")
async def generate_summary(request: Request):
    try:
        data = await request.json()
        summary = get_summary_from_gemini(data)
        filename = f"post_event_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        pdf_path = generate_pdf(summary, filename)
        return FileResponse(pdf_path, media_type="application/pdf", filename=filename)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
