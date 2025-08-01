from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "ibm-granite/granite-3.2-2b-instruct"
device = "cuda" if torch.cuda.is_available() else "cpu"

model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map=device,
    torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
)
tokenizer = AutoTokenizer.from_pretrained(model_path)

def is_finance_question(text):
    keywords = [
        "finance", "money", "investment", "stock", "equity", "portfolio",
        "GDP", "bank", "cryptocurrency", "bitcoin", "mutual fund",
        "savings", "debt", "loan", "home loan", "shares",
        "invest", "market", "trading", "broker", "interest rate",
        "tax", "currency", "dividend", "scholarship", "student loan",
        "budget", "part-time job", "education loan", "study abroad",
    ]
    return any(word in text.lower() for word in keywords)

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question", "")
    role = data.get("role", "User")

    if not is_finance_question(question):
        return {"answer": "Sorry, I can only answer questions related to finance, investments, markets, and related topics."}

    # Student gets more targeted prompt
    if role.lower() == "student":
        prompt = (
            "As a financial advisor for students named Icarus, provide helpful, practical, and student-specific financial guidance. "
            "Keep advice simple and relevant for university/college students."
            f"\nStudent asks: {question}\nFinancial Advisor:"
        )
    else:
        # Professional/others get the standard prompt
        prompt = (
            f"As a professional finance assistant named Orion, answer the following financial question concisely and accurately:\nQ: {question}\nA:"
        )

    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)
    set_seed(42)
    output = model.generate(
        input_ids,
        max_new_tokens=512,
    )
    prediction = tokenizer.decode(
        output[0, input_ids.shape[1]:],
        skip_special_tokens=True
    )
    return {"answer": prediction.strip()}

