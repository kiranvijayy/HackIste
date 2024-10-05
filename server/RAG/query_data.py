from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import CohereEmbeddings
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os
from cohere import Client

load_dotenv()

# Retrieve API keys from .env file
cohere_api_key = os.getenv('COHERE_API_KEY')

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
answer the question based on the following context:

{context}

---

study the above context and answer the following question: {question}
"""


def qandr(query_text):
    # Prepare the DB with CohereEmbeddings
    embedding_function = CohereEmbeddings(cohere_api_key=cohere_api_key, user_agent="MyApp/1.0")
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB for similar documents
    results = db.similarity_search_with_relevance_scores(query_text, k=4)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
    # Create the prompt using the results
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # Print the generated prompt for debugging
    print(prompt)

    # Call Cohere API to generate the response
    cohere_client = Client(cohere_api_key)
    response = cohere_client.generate(
        prompt=prompt, 
        max_tokens=300, 
        temperature=0.5
    )

    # Extract the response text
    response_text = response.generations[0].text if response.generations else "No valid response generated."

    return response_text
