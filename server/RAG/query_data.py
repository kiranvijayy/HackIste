import argparse
# from dataclasses import dataclass
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import CohereEmbeddings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os

from dotenv import load_dotenv

load_dotenv()

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Generate 3 quizz questions along with 4 options( 3 incorrect and one correct answer ) based only on the following context in the following format.
1. question?
a. option 1
b. option 2
c. option 3
d. option 4
Answer- 4

$

2. question?
a. option 1
b. option 2
c. option 3
d. option 4

Answer- 4

$

3. question?
a. option 1
b. option 2
c. option 3
d. option 4

Answer- 4


:

{context}

---

study the above context and generate quizzes in the given format on the following topic: {question}
"""


def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text

    # Prepare the DB.
    #embedding_function = OpenAIEmbeddings()
    #db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    cohere_api_key = os.environ['COHERE_API_KEY']  # Ensure COHERE_API_KEY is in .env
    embedding_function = CohereEmbeddings(cohere_api_key=cohere_api_key)
    
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(query_text, k=5)
   # if len(results) == 0 or results[0][1] < 0.7:
    #    print(f"Unable to find matching results.")
     #   return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    print(prompt)

   # model = ChatOpenAI()
   # response_text = model.predict(prompt)

    from cohere import Client

    cohere_api_key = os.getenv('COHERE_API_KEY')
    cohere_client = Client(cohere_api_key)

    response = cohere_client.generate(
        prompt=prompt, 
        max_tokens=600, 
        temperature=0.5
    )
    response_text = response.generations[0].text

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"\n Response: {response_text} \n \n Sources: {sources}"
    print('\n\n\n',response_text)
    #print(formatted_response)


if __name__ == "__main__":
    main()
